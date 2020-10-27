import { types } from '../types/types';

const initialState = {
  folders: [],
  notes: [],
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
        folders: action.payload,
        activeFolder: action.payload,
      };

    default:
      return state;
  }
};
