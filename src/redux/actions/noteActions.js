import { types } from '../types/types';
import { db } from '../../providers/firebase';

export const newNote = () => ({
  type: types.createNote,
});

export const userNotes = () => {
  return async (dispatch) => {
    let folders = [];
    let notes = [];
    const foldersRef = await db.collection('folders').get();

    if (foldersRef.docs.length > 0) {
      folders = foldersRef.docs[0].data().list;
      const notesRef = await db.collection(folders[0]).get();
      if (notesRef.docs.length > 0) {
        notesRef.docs.map((doc) => (notes = [...notes, doc.data()]));
        dispatch(activateNote(notes[0]));
      }
    }

    dispatch(allFolders(folders));
    dispatch(folderNotes(notes));
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

const activateNote = (note) => ({
  type: types.activateNote,
  payload: note,
});

const allFolders = (folders) => ({
  type: types.folders,
  payload: {
    list: folders,
    active: folders.length > 0 ? folders[0] : null,
  },
});

const folderNotes = (notes) => ({
  type: types.notes,
  payload: notes,
});
