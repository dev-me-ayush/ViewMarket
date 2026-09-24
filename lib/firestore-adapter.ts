import { firestore } from "./firestore";
import type { Firestore, Query, DocumentData, Timestamp } from "@google-cloud/firestore";

interface WhereClause {
  field: string;
  value: unknown;
  operator?: string;
}

function normalizeTimestamps(data: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, val] of Object.entries(data)) {
    if (val && typeof val === "object" && "toDate" in val && typeof (val as Timestamp).toDate === "function") {
      result[key] = (val as Timestamp).toDate();
    } else {
      result[key] = val;
    }
  }
  return result;
}

function stripUndefined(data: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, val] of Object.entries(data)) {
    if (val !== undefined) result[key] = val;
  }
  return result;
}

async function applyJoins(
  db: Firestore,
  model: string,
  record: Record<string, unknown>,
  join?: Record<string, boolean>
): Promise<Record<string, unknown>> {
  if (!join) return record;
  const result = { ...record };

  if (join.user && typeof record.userId === "string") {
    let userDoc = await db.collection("user").doc(record.userId).get();
    if (!userDoc.exists) userDoc = await db.collection("users").doc(record.userId).get();
    result.user = userDoc.exists ? normalizeTimestamps(userDoc.data() as Record<string, unknown>) : null;
  }

  if (join.account && typeof record.id === "string") {
    let snap = await db.collection("account").where("userId", "==", record.id).get();
    if (snap.empty) snap = await db.collection("accounts").where("userId", "==", record.id).get();
    result.account = snap.docs.map((d) => normalizeTimestamps(d.data() as Record<string, unknown>));
  }

  return result;
}

function buildQuery(db: Firestore, model: string, where?: WhereClause[]): Query<DocumentData> {
  let q: Query<DocumentData> = db.collection(model);
  if (where) {
    for (const w of where) q = q.where(w.field, "==", w.value);
  }
  return q;
}

export function firestoreAdapter(db: Firestore = firestore) {
  return () => {
    const adapter = {
      id: "firestore",
      async transaction<T>(callback: (trx: any) => Promise<T>): Promise<T> {
        return callback(adapter);
      },

      async create({ model, data }: { model: string; data: Record<string, unknown> }) {
        const id = (data.id as string) || db.collection(model).doc().id;
        const record = stripUndefined({ ...data, id });
        await db.collection(model).doc(id).set(record);
        return normalizeTimestamps(record);
      },

      async findOne({ model, where, join }: { model: string; where: WhereClause[]; join?: Record<string, boolean> }) {
        const idMatch = where.find((w) => w.field === "id");
        let result: Record<string, unknown> | null = null;
        if (idMatch && typeof idMatch.value === "string") {
          const doc = await db.collection(model).doc(idMatch.value).get();
          if (doc.exists) result = normalizeTimestamps(doc.data() as Record<string, unknown>);
        } else {
          const snap = await buildQuery(db, model, where).limit(1).get();
          if (!snap.empty) result = normalizeTimestamps(snap.docs[0].data() as Record<string, unknown>);
        }
        return result ? applyJoins(db, model, result, join) : null;
      },

      async findMany({
        model, where, limit, offset, sortBy, join,
      }: {
        model: string; where?: WhereClause[]; limit?: number; offset?: number;
        sortBy?: { field: string; direction: "asc" | "desc" }; join?: Record<string, boolean>;
      }) {
        const hasWhere = Boolean(where && where.length > 0);
        let q = buildQuery(db, model, where);

        if (!hasWhere && sortBy) q = q.orderBy(sortBy.field, sortBy.direction);
        if (typeof offset === "number" && offset > 0) q = q.offset(offset);
        if (typeof limit === "number" && limit > 0 && !hasWhere) q = q.limit(limit);

        const snap = await q.get();
        let results = snap.docs.map((doc) => normalizeTimestamps(doc.data() as Record<string, unknown>));

        if (hasWhere && sortBy) {
          results.sort((a, b) => {
            const aVal = a[sortBy.field];
            const bVal = b[sortBy.field];
            if (aVal == null && bVal == null) return 0;
            if (aVal == null) return 1;
            if (bVal == null) return -1;
            return aVal < bVal ? (sortBy.direction === "asc" ? -1 : 1) : (sortBy.direction === "asc" ? 1 : -1);
          });
        }

        if (hasWhere && typeof limit === "number" && limit > 0) results = results.slice(0, limit);
        if (join) results = await Promise.all(results.map((r) => applyJoins(db, model, r, join)));
        return results;
      },

      async update({ model, where, update: updateData }: { model: string; where: WhereClause[]; update: Record<string, unknown> }) {
        const idMatch = where.find((w) => w.field === "id");
        let docId: string | null = null;
        let currentData: Record<string, unknown> = {};

        if (idMatch && typeof idMatch.value === "string") {
          docId = idMatch.value;
          const doc = await db.collection(model).doc(docId).get();
          if (doc.exists) currentData = doc.data() as Record<string, unknown>;
        } else {
          const snap = await buildQuery(db, model, where).limit(1).get();
          if (!snap.empty) {
            docId = snap.docs[0].id;
            currentData = snap.docs[0].data() as Record<string, unknown>;
          }
        }

        if (!docId) return null;
        const cleanUpdate = stripUndefined(updateData);
        await db.collection(model).doc(docId).set(cleanUpdate, { merge: true });
        return normalizeTimestamps({ ...currentData, ...cleanUpdate, id: docId });
      },

      async updateMany({ model, where, update: updateData }: { model: string; where: WhereClause[]; update: Record<string, unknown> }) {
        const snap = await buildQuery(db, model, where).get();
        if (snap.empty) return 0;
        const cleanUpdate = stripUndefined(updateData);
        const batch = db.batch();
        for (const doc of snap.docs) batch.set(doc.ref, cleanUpdate, { merge: true });
        await batch.commit();
        return snap.size;
      },

      async delete({ model, where }: { model: string; where: WhereClause[] }) {
        const idMatch = where.find((w) => w.field === "id");
        if (idMatch && typeof idMatch.value === "string") {
          await db.collection(model).doc(idMatch.value).delete();
          return;
        }
        const snap = await buildQuery(db, model, where).limit(1).get();
        if (!snap.empty) await snap.docs[0].ref.delete();
      },

      async deleteMany({ model, where }: { model: string; where: WhereClause[] }) {
        const snap = await buildQuery(db, model, where).get();
        if (snap.empty) return 0;
        const batch = db.batch();
        for (const doc of snap.docs) batch.delete(doc.ref);
        await batch.commit();
        return snap.size;
      },
    };

    return adapter;
  };
}
