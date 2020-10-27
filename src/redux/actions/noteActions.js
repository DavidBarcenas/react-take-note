import { types } from '../types/types';
import { db } from '../../providers/firebase';

export const newNote = () => ({
  type: types.createNote,
});

export const saveNewNote = (note) => {
  return async (dispatch, getState) => {
    const { auth } = getState();

    const refId = await db.collection(note.collection).doc().id;
    const newNote = { ...note, user: { ...auth }, id: refId };

    await db.collection(note.collection).doc(refId).set(newNote);
  };
};

export const saveCollection = (collection) => {
  return async (dispatch) => {
    await db.collection('folders').add(collection);
  };
};
