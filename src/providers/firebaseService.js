import { db, firebase } from './firebase';
import { v4 as uuidv4 } from 'uuid';

const refId = uuidv4().replaceAll('-', '').substr(0, 20);

export const saveNote = async (uid, note) => {
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

export const uploadFile = (uid, fileList) => {
  const storageRef = firebase.storage().ref();
  const uploadTask = storageRef.child(`${uid}/${refId}`).put(fileList[0]);

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');

      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    },
    (error) => {
      console.log('ocurrio un error al subir arvhivo', error);
    },
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        console.log('File available at', downloadURL);
      });
    }
  );
};
