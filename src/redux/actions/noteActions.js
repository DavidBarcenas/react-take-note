import { types } from '../types/types';
import { showAlert } from './uiActions';
import {
  alert_message_success,
  alert_type_success,
} from '../../const/constants';
import { getNotes, saveNote } from '../../providers/firebaseService';
import { db } from '../../providers/firebase';

export const userNotes = () => {
  return async (dispatch, getState) => {
    const { auth } = getState();
    try {
      const userdata = await db.doc(`${auth.uid}/notes`).get();
      if (userdata.data()) {
        const folders = userdata.data().folders;
        dispatch(getAllFolders(folders));
        if (folders.length > 0) {
          dispatch(getNotesFolder(folders[0]));
        }
      } else {
        await db.collection(auth.uid).doc('user').set(auth);
      }
    } catch (error) {
      dispatch(showAlert('Ocurrió un error, intente más tarde', 'error'));
    }
  };
};

export const saveNewNote = (note) => {
  return async (dispatch, getState) => {
    const { auth, notes } = getState();
    const folderExists = notes.folders.find((f) => f === note.collection);

    try {
      const newNote = await saveNote(auth.uid, note);
      if (notes.folders.length > 0) {
        if (!folderExists) {
          await db
            .doc(`${auth.uid}/notes`)
            .update({ folders: [note.collection, ...notes.folders] });
          dispatch(getAllFolders([note.collection, ...notes.folders]));
        }
      } else {
        await db
          .collection(auth.uid)
          .doc('notes')
          .set({
            folders: [note.collection],
          });
        dispatch(getAllFolders([note.collection]));
      }

      if (note.collection !== notes.activeFolder) {
        dispatch(getNotesFolder(note.collection));
      } else {
        dispatch(folderNotes([newNote, ...notes.folderNotes]));
        dispatch(activateNote(newNote));
      }
      dispatch(showAlert(alert_message_success, alert_type_success));
    } catch (error) {
      dispatch(showAlert('No se guardo la nota correctamente', 'error'));
    }
  };
};

export const getNotesFolder = (folder) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    try {
      const notes = await getNotes(uid, folder);
      dispatch(activateFolder(folder));
      dispatch(folderNotes(notes.docs.map((doc) => doc.data())));
      dispatch(activateNote(notes.docs[0].data()));
    } catch (error) {
      dispatch(showAlert('No se pudo obtener las notas', 'error'));
    }
  };
};

export const updateNote = (note) => {
  return async (dispatch, getState) => {
    const { notes, auth } = getState();
    const noteList = notes.folderNotes.filter((n) => n.id !== note.id);

    try {
      await db.doc(`${auth.uid}/notes/list/${note.id}`).update(note);

      if (note.collection !== notes.activeFolder) {
        if (notes.folderNotes.length === 1) {
          const updateFolders = notes.folders.filter(
            (folder) => folder !== notes.activeFolder
          );
          await db.doc(`${auth.uid}/notes`).update({ folders: updateFolders });
          dispatch(getAllFolders(updateFolders));
        }
        if (!notes.folders.includes(note.collection)) {
          await db
            .doc(`${auth.uid}/notes`)
            .update({ folders: [note.collection, ...notes.folders] });
          dispatch(getAllFolders([note.collection, ...notes.folders]));
        }
        dispatch(getNotesFolder(note.collection));
      } else {
        dispatch(folderNotes([note, ...noteList]));
        dispatch(activateNote(note));
      }
      dispatch(cancelNoteEdit());
      dispatch(showAlert('¡Se actualizó la nota!', 'success'));
    } catch (error) {
      dispatch(showAlert('No se pudo actualizar la nota', 'error'));
    }
  };
};

export const deleteNote = () => {
  return async (dispatch, getState) => {
    const { notes, auth } = getState();
    const updateList = notes.folders.filter(
      (f) => f !== notes.activeNote.collection
    );

    try {
      await db.doc(`${auth.uid}/notes/list/${notes.activeNote.id}`).delete();
      dispatch(showAlert('Nota eliminada', 'success'));
      dispatch(removeNote(notes.activeNote.id));

      if (notes.folderNotes.length === 1) {
        dispatch(getAllFolders(updateList));
        if (updateList.length > 0) {
          dispatch(getNotesFolder(updateList[0]));
        }
        await db.doc(`${auth.uid}/notes`).update({ folders: updateList });
      }
    } catch (error) {
      dispatch(showAlert('No se pudo eliminar la nota', 'error'));
    }
  };
};

export const getAll = (search) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    try {
      const data = await db.collection(`${uid}/notes/list`).get();
      const notes = data.docs
        .map((doc) => doc.data())
        .filter(
          (doc) => doc.title.includes(search) || doc.body.includes(search)
        );
      dispatch(searchNotes(notes));
    } catch (error) {
      dispatch(showAlert('No se pudo hacer la búsqueda', 'error'));
    }
  };
};

export const cancelNoteEdit = () => ({
  type: types.cancelNote,
  payload: false,
});

export const activateNote = (note) => ({
  type: types.activateNote,
  payload: note,
});

export const activateFolder = (folder) => ({
  type: types.activateFolder,
  payload: folder,
});

export const newNote = (note) => ({
  type: types.createNote,
  payload: {
    edit: true,
    note,
  },
});

export const resetNotes = () => ({
  type: types.logoutNote,
});

const getAllFolders = (folders) => ({
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

const removeNote = (noteId) => ({
  type: types.deleteNote,
  payload: noteId,
});

const searchNotes = (notes) => ({
  type: types.searchNote,
  payload: notes,
});
