import { types } from '../types/types';
import { db } from '../../providers/firebase';

export const newNote = () => ({
  type: types.createNote,
});

export const userNotes = () => {
  return async (dispatch) => {
    let folders = [];
    const foldersRef = await db.collection('folders').get();

    if (foldersRef.docs.length > 0) {
      folders = foldersRef.docs[0].data().list;
    }

    dispatch(allFolders(folders));
  };
};

export const saveNewNote = (note) => {
  return async (dispatch, getState) => {
    const { auth } = getState();

    const refId = await db.collection(note.collection).doc().id;
    const newNote = { ...note, user: auth, id: refId };

    await db.collection(note.collection).doc(refId).set(newNote);
  };
};

export const saveCollection = (collection) => {
  return async (dispatch, getState) => {
    const { auth } = getState();

    await db.collection('folders').add({
      auth,
      list: collection,
    });
  };
};

const allFolders = (folders) => ({
  type: types.folders,
  payload: folders,
});

export const folderNotes = (notes) => ({
  type: types.notes,
  payload: notes,
});
