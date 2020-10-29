import { db } from './firebase';

export const getCollection = async (collection) => {
  const data = await db.collection(collection).get();
  const docs = data.docs.length === 0 ? [] : data.docs.map((doc) => doc.data());
  return docs;
};

export const updateDoc = async (collection, docID, data) => {
  await db.collection(collection).doc(docID).update(data);
};

export const createDoc = async (collection, data) => {
  const refId = await db.collection(collection).doc().id;
  await db
    .collection(collection)
    .doc(refId)
    .set({ ...data, id: refId });
};
