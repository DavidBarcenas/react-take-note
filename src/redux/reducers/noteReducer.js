import { types } from '../types/types';

const initialState = {
  folders: [],
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
      };

    default:
      return state;
  }
};
