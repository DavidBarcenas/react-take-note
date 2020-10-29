import { types } from '../types/types';
import { noteModel } from '../../models/noteModel';
import { showAlert } from './uiActions';
import {
  alert_message_success,
  alert_type_success,
} from '../../const/constants';
import {
  createDoc,
  getCollection,
  updateDoc,
} from '../../providers/firebaseService';

export const userNotes = () => {
  return async (dispatch) => {
    try {
      const folders = await getCollection('folders');
      if (folders.length > 0) {
        dispatch(getAllFolders(folders[0].list, folders[0].id));

        if (folders[0].list.length > 0) {
          const notes = await getCollection(folders[0].list[0]);

          if (notes.length > 0) {
            dispatch(activateNote(notes[0]));
            dispatch(folderNotes(notes));
          }
        }
      }
    } catch (error) {
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
    const folderExists = notes.folders.list.find((f) => f === note.collection);

    try {
      await createDoc(note.collection, {
        ...note,
        user: auth,
      });
      dispatch(showAlert(alert_message_success, alert_type_success));
      dispatch(getNotesFolder(note.collection));

      if (notes.folders.id) {
        if (!folderExists) {
          const updateList = [note.collection, ...notes.folders.list];
          dispatch(getAllFolders(updateList, notes.folders.id));
          await updateDoc('folders', notes.folders.id, {
            list: updateList,
          });
        }
      } else {
        await createDoc('folders', {
          user: { ...auth },
          list: notes.folders.list,
          date: new Date(),
        });
      }
    } catch (error) {
      dispatch(showAlert('No se guardo la nota correctamente', error));
    }
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

export const newNote = () => ({
  type: types.createNote,
  payload: noteModel,
});

const getAllFolders = (folders, id) => ({
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
