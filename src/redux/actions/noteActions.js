import { types } from '../types/types';
import { db } from '../../providers/firebase';
import { noteModel } from '../../models/noteModel';
import { showAlert } from './uiActions';
import {
  alert_message_success,
  alert_type_success,
} from '../../const/constants';

export const newNote = () => ({
  type: types.createNote,
  payload: noteModel,
});

export const userNotes = () => {
  return async (dispatch) => {
    let folders = [];
    let notes = [];
    const foldersRef = await db.collection('folders').get();

    if (foldersRef.docs.length > 0) {
      folders = foldersRef.docs[0].data();
      const notesRef = await db.collection(folders.list[0]).get();
      if (notesRef.docs.length > 0) {
        notesRef.docs.map((doc) => (notes = [...notes, doc.data()]));
        dispatch(activateNote(notes[0]));
      }
      dispatch(allFolders(folders.list, folders.id));
      dispatch(folderNotes(notes));
    }
  };
};

export const saveNewNote = (note) => {
  return async (dispatch, getState) => {
    const { auth } = getState();

    const refId = await db.collection(note.collection).doc().id;
    const newNote = { ...note, user: auth, id: refId };

    await db.collection(note.collection).doc(refId).set(newNote);
    dispatch(showAlert(alert_message_success, alert_type_success));
  };
};

export const saveCollection = (collection, update = false) => {
  return async (dispatch, getState) => {
    const { auth, notes } = getState();

    if (update) {
      await db
        .collection('folders')
        .doc(notes.folders.id)
        .update({ list: collection });
    } else {
      const refId = await db.collection('folders').doc().id;
      await db
        .collection('folders')
        .doc(refId)
        .set({
          user: { ...auth },
          list: collection,
          id: refId,
        });
    }
  };
};

export const getNotesFolder = (folder) => {
  return async (dispatch, getState) => {
    let notes = [];
    const foldersRef = await db.collection(folder).get();

    if (foldersRef.docs.length > 0) {
      foldersRef.docs.map((doc) => (notes = [...notes, doc.data()]));
      dispatch(activateNote(notes[0]));
      dispatch(activateFolder(folder));
    }

    dispatch(folderNotes(notes));
  };
};

export const activateNote = (note) => ({
  type: types.activateNote,
  payload: note,
});

export const activateFolder = (folder) => ({
  type: types.activateFolder,
  payload: folder,
});

const allFolders = (folders, id) => ({
  type: types.folders,
  payload: {
    id,
    list: folders,
    active: folders.length > 0 ? folders[0] : null,
  },
});

const folderNotes = (notes) => ({
  type: types.notes,
  payload: notes,
});
