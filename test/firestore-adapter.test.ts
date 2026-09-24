import { describe, it, expect, vi } from "vitest";
import { firestoreAdapter } from "@/lib/firestore-adapter";
import type { Firestore } from "@google-cloud/firestore";

function createMockFirestore() {
  const store = new Map<string, Map<string, any>>();

  const getCollection = (colName: string) => {
    if (!store.has(colName)) store.set(colName, new Map());
    return store.get(colName)!;
  };

  const mockDb = {
    collection: (colName: string) => {
      const col = getCollection(colName);
      return {
        doc: (docId?: string) => {
          const id = docId || `auto_${Math.random().toString(36).substring(2, 9)}`;
          return {
            id,
            get: async () => ({
              exists: col.has(id),
              data: () => col.get(id),
            }),
            set: async (data: any, options?: { merge?: boolean }) => {
              if (options?.merge && col.has(id)) {
                col.set(id, { ...col.get(id), ...data });
              } else {
                col.set(id, data);
              }
            },
            delete: async () => {
              col.delete(id);
            },
          };
        },
        where: (field: string, op: string, value: any) => {
          return {
            where: () => ({ limit: () => ({ get: async () => ({ empty: true, docs: [] }) }) }),
            limit: (num: number) => ({
              get: async () => {
                const results: any[] = [];
                for (const [id, item] of col.entries()) {
                  if (item[field] === value) {
                    results.push({ id, data: () => item, ref: { delete: async () => col.delete(id) } });
                    if (results.length >= num) break;
                  }
                }
                return {
                  empty: results.length === 0,
                  docs: results,
                  size: results.length,
                };
              },
            }),
            get: async () => {
              const results: any[] = [];
              for (const [id, item] of col.entries()) {
                if (item[field] === value) {
                  results.push({ id, data: () => item, ref: { delete: async () => col.delete(id) } });
                }
              }
              return { empty: results.length === 0, docs: results, size: results.length };
            },
          };
        },
        get: async () => {
          const docs = Array.from(col.entries()).map(([id, item]) => ({
            id,
            data: () => item,
          }));
          return { docs, size: docs.length, empty: docs.length === 0 };
        },
      };
    },
    batch: () => {
      const operations: Array<() => Promise<void>> = [];
      return {
        set: (ref: any, data: any) => operations.push(async () => ref.set(data, { merge: true })),
        delete: (ref: any) => operations.push(async () => ref.delete()),
        commit: async () => {
          for (const op of operations) await op();
        },
      };
    },
  } as unknown as Firestore;

  return { mockDb, store };
}

describe("Better Auth Firestore Adapter", () => {
  it("creates a document with auto-generated id if none provided", async () => {
    const { mockDb } = createMockFirestore();
    const adapter = firestoreAdapter(mockDb)();

    const created = await adapter.create({
      model: "users",
      data: { name: "Ayush", email: "ayush@example.com" },
    });

    expect(created.id).toBeDefined();
    expect(created.name).toBe("Ayush");
    expect(created.email).toBe("ayush@example.com");
  });

  it("finds a document by id", async () => {
    const { mockDb } = createMockFirestore();
    const adapter = firestoreAdapter(mockDb)();

    await adapter.create({
      model: "users",
      data: { id: "user_101", name: "Trader", email: "trader@viewmarket.in" },
    });

    const found = await adapter.findOne({
      model: "users",
      where: [{ field: "id", value: "user_101" }],
    });

    expect(found).not.toBeNull();
    expect(found?.email).toBe("trader@viewmarket.in");
  });

  it("returns null when searching for non-existent document", async () => {
    const { mockDb } = createMockFirestore();
    const adapter = firestoreAdapter(mockDb)();

    const notFound = await adapter.findOne({
      model: "users",
      where: [{ field: "id", value: "non_existent_id" }],
    });

    expect(notFound).toBeNull();
  });

  it("updates existing document with merge semantics", async () => {
    const { mockDb } = createMockFirestore();
    const adapter = firestoreAdapter(mockDb)();

    await adapter.create({
      model: "sessions",
      data: { id: "sess_1", token: "tok_abc", ipAddress: "127.0.0.1" },
    });

    const updated = await adapter.update({
      model: "sessions",
      where: [{ field: "id", value: "sess_1" }],
      update: { ipAddress: "192.168.1.1" },
    });

    expect(updated?.ipAddress).toBe("192.168.1.1");
    expect(updated?.token).toBe("tok_abc");
  });

  it("deletes document by id", async () => {
    const { mockDb } = createMockFirestore();
    const adapter = firestoreAdapter(mockDb)();

    await adapter.create({
      model: "sessions",
      data: { id: "sess_to_delete", token: "tok_del" },
    });

    await adapter.delete({
      model: "sessions",
      where: [{ field: "id", value: "sess_to_delete" }],
    });

    const check = await adapter.findOne({
      model: "sessions",
      where: [{ field: "id", value: "sess_to_delete" }],
    });

    expect(check).toBeNull();
  });

  it("safely handles undefined values without throwing (e.g. optional refreshToken)", async () => {
    const { mockDb } = createMockFirestore();
    const adapter = firestoreAdapter(mockDb)();

    const created = await adapter.create({
      model: "accounts",
      data: {
        userId: "user_1",
        providerId: "google",
        refreshToken: undefined,
        idToken: undefined,
      },
    });

    expect(created.id).toBeDefined();
    expect(created.refreshToken).toBeUndefined();
    expect(created.providerId).toBe("google");
  });

  it("resolves join: { user: true } when querying accounts", async () => {
    const { mockDb } = createMockFirestore();
    const adapter = firestoreAdapter(mockDb)();

    await adapter.create({
      model: "user",
      data: { id: "user_42", name: "Ayush", email: "dev.me.ayush@gmail.com" },
    });
    await adapter.create({
      model: "account",
      data: { id: "acc_42", userId: "user_42", providerId: "google", accountId: "goog_123" },
    });

    const accounts = await adapter.findMany({
      model: "account",
      where: [{ field: "accountId", value: "goog_123" }],
      join: { user: true },
    });

    expect(accounts).toHaveLength(1);
    expect((accounts[0] as any).user).toBeDefined();
    expect((accounts[0] as any).user.email).toBe("dev.me.ayush@gmail.com");
  });
});
