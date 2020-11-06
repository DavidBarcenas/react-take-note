import { db } from './firebase';
import { v4 as uuidv4 } from 'uuid';

export const saveNote = async (uid, note) => {
  const refId = uuidv4().replaceAll('-', '').substr(0, 20);
  await db
    .collection(`${uid}/notes/list`)
    .doc(refId)
    .set({ ...note, id: refId });

  return { ...note, id: refId };
};

export const getNotes = async (uid, collection) => {
  const data = await db
    .collection(`${uid}/notes/list`)
    .where('collection', '==', collection)
    .orderBy('date', 'desc')
    .get();

  return data;
};

export const getCollection = async (collection) => {
  const data = await db.collection(collection).get();
  const docs =
    data.docs.length === 0
      ? []
      : data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
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

export const deleteDoc = async (collection, docID) => {
  await db.collection(collection).doc(docID).delete();
};

export const createCollection = async (collection, data) => {
  await db.collection(collection).add(data);
};
