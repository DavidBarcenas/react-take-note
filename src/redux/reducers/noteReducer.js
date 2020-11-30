import { types } from '../types/types';

const initialState = {
  folders: [],
  folderNotes: [],
  activeNote: null,
  activeFolder: null,
  editNote: false,
  showModalFolder: false,
  files: [],
};

export const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.createNote:
      return {
        ...state,
        editNote: action.payload.edit,
        activeNote: action.payload.note,
      };

    case types.folders:
      return {
        ...state,
        folders: action.payload.list,
        activeFolder: action.payload.active,
      };

    case types.notes:
      return {
        ...state,
        folderNotes: action.payload,
      };

    case types.activateNote:
      return {
        ...state,
        activeNote: action.payload,
        activeFolder: action.payload.collection,
        editNote: false,
      };

    case types.activateFolder:
      return {
        ...state,
        activeFolder: action.payload,
        editNote: false,
      };

    case types.deleteNote:
      return {
        ...state,
        folderNotes: state.folderNotes.filter(
          (note) => note.id !== action.payload
        ),
        activeNote: state.folderNotes.length > 1 ? state.folderNotes[1] : null,
      };

    case types.cancelNote:
      return {
        ...state,
        editNote: false,
        activeNote:
          state.activeNote && state.activeNote.id === ''
            ? state.folderNotes[0]
            : state.activeNote,
      };

    case types.searchNote:
      return {
        ...state,
        folderNotes: action.payload,
        activeNote: action.payload.length > 0 ? action.payload[0] : null,
        activeFolder:
          action.payload.length > 0 ? action.payload[0].collection : null,
      };

    case types.showModalFolder:
      return {
        ...state,
        showModalFolder: action.payload,
      };

    case types.addNewFolder:
      return {
        ...state,
        activeNote: { ...state.activeNote, collection: action.payload },
      };
    case types.logoutNote:
      return {
        ...initialState,
      };
    case types.saveFiles:
      return {
        ...state,
        files: [...state.files, action.payload],
      };

    default:
      return state;
  }
};
