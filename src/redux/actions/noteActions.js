import { types } from '../types/types';
import { db } from '../../providers/firebase';
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
      console.log('el error', error);
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
          await updateDoc('folders', notes.folders.id, notes.folders.list);
          dispatch(
            getAllFolders(
              [note.collection, ...notes.folders.list],
              notes.folders.id
            )
          );
        }
      } else {
        await createDoc('folders', {
          user: { ...auth },
          list: notes.folders.list,
        });
      }
    } catch (error) {
      dispatch(showAlert('No se guardo la nota correctamente', 'error'));
    }

    // const refId = await db.collection(note.collection).doc().id;
    // const newNote = { ...note, user: auth, id: refId };

    // await db.collection(note.collection).doc(refId).set(newNote);
    // dispatch(showAlert(alert_message_success, alert_type_success));

    // dispatch(
    //   activateNote({ ...note, id: refId, date: dateFormat(note.date, false) })
    // );
    // dispatch(activateFolder(note.collection));

    // dispatch(
    //   folderNotes([
    //     { ...note, id: refId, date: new Date(note.date).getTime() },
    //     ...notes.folderNotes,
    //   ])
    // );

    // const existFolder = notes.folders.list.find((f) => f === note.collection);
    // if (!existFolder) {
    //   dispatch(
    //     getAllFolders(
    //       [note.collection, ...notes.folders.list],
    //       notes.folders.id
    //     )
    //   );
    // }

    // const notesRef = await db.collection(note.collection).get();

    // dispatch(folderNotes(notesRef.docs.map((doc) => doc.data())));
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
