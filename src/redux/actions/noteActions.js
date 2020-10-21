import { noteModel } from '../../models/noteModel';
import { types } from '../types/types';
import { db } from '../../providers/firebase';

export const createNote = () => ({
  type: types.createNote,
  payload: noteModel,
});

export const saveNewNote = (note) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const refId = await db.collection(`${uid}/app/notes`).doc().id;
    console.log(refId);
    const newNote = { ...noteModel, ...note, id: refId };
    await db.collection(`${uid}/app/notes`).doc(refId).set(newNote);
  };
};
