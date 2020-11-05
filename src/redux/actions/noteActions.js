import { types } from '../types/types';
import { showAlert } from './uiActions';
import {
  alert_message_success,
  alert_type_success,
} from '../../const/constants';
import {
  createCollection,
  createDoc,
  deleteDoc,
  getCollection,
  getNotes,
  updateDoc,
} from '../../providers/firebaseService';
import { normalizeName } from '../../util/dateFormat';
import { db } from '../../providers/firebase';

export const userNotes = () => {
  return async (dispatch, getState) => {
    const { uid, name } = getState().auth;
    try {
      const userdata = await getCollection(uid);
      if (userdata.length > 0) {
        const foldersarray = userdata.find((doc) => doc.id === 'notes');
        if (foldersarray) {
          dispatch(getAllFolders(foldersarray.folders));
          const notes = await getNotes(uid, foldersarray.folders[0]);
          dispatch(folderNotes(notes.docs.map((doc) => doc.data())));
          dispatch(activateNote(notes[0]));
        }
      } else {
        await db.collection(uid).doc('user').set({ name });
      }
    } catch (error) {
      console.log(error);
      dispatch(showAlert('Ocurrió un error, intente más tarde', 'error'));
    }
  };
};

export const getNotesFolder = (folder) => {
  return async (dispatch) => {
    try {
      const notes = await getCollection(folder);
      dispatch(activateFolder(folder));
      dispatch(folderNotes(notes));

      if (notes.length > 0) {
        dispatch(activateNote(notes[0]));
      }
    } catch (error) {
      dispatch(showAlert('No se pudo obtener las notas', 'error'));
    }
  };
};

export const saveNewNote = (note) => {
  return async (dispatch, getState) => {
    const { auth, notes } = getState();
    const folderExists = notes.folders.find((f) => f === note.collection);

    try {
      const collection = normalizeName(note.collection);
      console.log(collection);
      await createDoc(`${auth.uid}/notes/list`, note);
      dispatch(showAlert(alert_message_success, alert_type_success));

      if (!folderExists) {
        // await updateDoc(`${auth.uid}`, 'notes', {
        //   folders: [note.collection, ...notes.folders],
        // });
        await db
          .doc(`${auth.uid}/notes`)
          .set({ folders: [note.collection, ...notes.folders] });
      } else {
        await db
          .collection(auth.uid)
          .doc('notes')
          .set({
            folder: [note.collection],
          });
      }

      // dispatch(getNotesFolder(collection));

      // if (notes.folders.id) {
      //   if (!folderExists) {
      //     const updateList = [note.collection, ...notes.folders.list];
      //     dispatch(getAllFolders(updateList, notes.folders.id));
      //     await updateDoc('folders', notes.folders.id, {
      //       list: updateList,
      //     });
      //   }
      // } else {
      //   await createDoc('folders', {
      //     user: { ...auth },
      //     list: notes.folders.list,
      //     date: new Date(),
      //   });
      // }
    } catch (error) {
      console.log(error);
      dispatch(showAlert('No se guardo la nota correctamente', 'error'));
    }
  };
};

export const updateNote = (note) => {
  return async (dispatch, getState) => {
    const { notes } = getState();
    const noteList = notes.folderNotes.filter((n) => n.id !== note.id);

    try {
      await updateDoc(note.collection, note.id, note);
      dispatch(showAlert('¡Se actualizó la nota!', 'success'));
      dispatch(cancelNoteEdit());
      dispatch(folderNotes([note, ...noteList]));
      dispatch(activateNote(note));
    } catch (error) {
      dispatch(showAlert('No se pudo actualizar la nota', 'error'));
    }
  };
};

export const deleteNote = () => {
  return async (dispatch, getState) => {
    const { activeNote, folderNotes, folders } = getState().notes;
    const updateList = folders.list.filter((f) => f !== activeNote.collection);
    console.log('ipdateList', updateList);
    try {
      await deleteDoc(activeNote.collection, activeNote.id);
      dispatch(showAlert('Nota eliminada', 'success'));
      dispatch(removeNote(activeNote.id));

      if (folderNotes.length === 1) {
        dispatch(getAllFolders(updateList, folders.id));
        if (updateList.length > 0) {
          dispatch(getNotesFolder(updateList[0]));
        }
        await updateDoc('folders', folders.id, {
          list: updateList,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch(showAlert('No se pudo eliminar la nota', 'error'));
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
