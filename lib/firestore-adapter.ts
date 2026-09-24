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
    if (val !== undefined) {
      result[key] = val;
    }
  }
  return result;
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

    async findOne({ model, where }: { model: string; where: WhereClause[] }) {
      const idMatch = where.find((w) => w.field === "id");
      if (idMatch && typeof idMatch.value === "string") {
        const doc = await db.collection(model).doc(idMatch.value).get();
        if (!doc.exists) return null;
        return normalizeTimestamps(doc.data() as Record<string, unknown>);
      }

      let q: Query<DocumentData> = db.collection(model);
      for (const w of where) {
        q = q.where(w.field, "==", w.value);
      }
      const snap = await q.limit(1).get();
      if (snap.empty) return null;
      return normalizeTimestamps(snap.docs[0].data() as Record<string, unknown>);
    },

    async findMany({
      model,
      where,
      limit,
      offset,
      sortBy,
    }: {
      model: string;
      where?: WhereClause[];
      limit?: number;
      offset?: number;
      sortBy?: { field: string; direction: "asc" | "desc" };
    }) {
      let q: Query<DocumentData> = db.collection(model);
      const hasWhere = Boolean(where && where.length > 0);
      if (hasWhere && where) {
        for (const w of where) {
          q = q.where(w.field, "==", w.value);
        }
      } else if (sortBy) {
        // Only delegate orderBy to Firestore server when no where clause is present
        // to avoid triggering Google Cloud Firestore FAILED_PRECONDITION composite index errors
        q = q.orderBy(sortBy.field, sortBy.direction);
      }

      if (typeof offset === "number" && offset > 0) {
        q = q.offset(offset);
      }
      if (typeof limit === "number" && limit > 0 && !hasWhere) {
        q = q.limit(limit);
      }

      const snap = await q.get();
      let results = snap.docs.map((doc) => normalizeTimestamps(doc.data() as Record<string, unknown>));

      if (hasWhere && sortBy) {
        results.sort((a, b) => {
          const aVal = a[sortBy.field];
          const bVal = b[sortBy.field];
          if (aVal == null && bVal == null) return 0;
          if (aVal == null) return 1;
          if (bVal == null) return -1;
          if (aVal < bVal) return sortBy.direction === "asc" ? -1 : 1;
          if (aVal > bVal) return sortBy.direction === "asc" ? 1 : -1;
          return 0;
        });
      }

      if (hasWhere && typeof limit === "number" && limit > 0) {
        results = results.slice(0, limit);
      }

      return results;
    },

    async update({
      model,
      where,
      update: updateData,
    }: {
      model: string;
      where: WhereClause[];
      update: Record<string, unknown>;
    }) {
      const idMatch = where.find((w) => w.field === "id");
      let docId: string | null = null;
      let currentData: Record<string, unknown> = {};

      if (idMatch && typeof idMatch.value === "string") {
        docId = idMatch.value;
        const doc = await db.collection(model).doc(docId).get();
        if (doc.exists) {
          currentData = doc.data() as Record<string, unknown>;
        }
      } else {
        let q: Query<DocumentData> = db.collection(model);
        for (const w of where) {
          q = q.where(w.field, "==", w.value);
        }
        const snap = await q.limit(1).get();
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

    async updateMany({
      model,
      where,
      update: updateData,
    }: {
      model: string;
      where: WhereClause[];
      update: Record<string, unknown>;
    }) {
      let q: Query<DocumentData> = db.collection(model);
      for (const w of where) {
        q = q.where(w.field, "==", w.value);
      }
      const snap = await q.get();
      if (snap.empty) return 0;

      const cleanUpdate = stripUndefined(updateData);
      const batch = db.batch();
      for (const doc of snap.docs) {
        batch.set(doc.ref, cleanUpdate, { merge: true });
      }
      await batch.commit();
      return snap.size;
    },

    async delete({ model, where }: { model: string; where: WhereClause[] }) {
      const idMatch = where.find((w) => w.field === "id");
      if (idMatch && typeof idMatch.value === "string") {
        await db.collection(model).doc(idMatch.value).delete();
        return;
      }
      let q: Query<DocumentData> = db.collection(model);
      for (const w of where) {
        q = q.where(w.field, "==", w.value);
      }
      const snap = await q.limit(1).get();
      if (!snap.empty) {
        await snap.docs[0].ref.delete();
      }
    },

    async deleteMany({ model, where }: { model: string; where: WhereClause[] }) {
      let q: Query<DocumentData> = db.collection(model);
      for (const w of where) {
        q = q.where(w.field, "==", w.value);
      }
      const snap = await q.get();
      if (snap.empty) return 0;

      const batch = db.batch();
      for (const doc of snap.docs) {
        batch.delete(doc.ref);
      }
      await batch.commit();
      return snap.size;
    },
  };

  return adapter;
};
}
