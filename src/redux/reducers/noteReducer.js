import { types } from '../types/types';

const initialState = {
  folders: {
    id: null,
    list: [],
  },
  folderNotes: [],
  activeNote: null,
  activeFolder: null,
};

export const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.createNote:
      return {
        ...state,
        activeNote: null,
      };

    case types.folders:
      return {
        ...state,
        folders: {
          id: action.payload.id,
          list: action.payload.list,
        },
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
      };

    case types.activateFolder:
      return {
        ...state,
        activeFolder: action.payload,
      };

    default:
      return state;
  }
};
