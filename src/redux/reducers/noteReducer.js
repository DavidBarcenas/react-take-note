import { types } from '../types/types';

const initialState = {
  allNotes: [],
  activeNote: null,
};

export const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.createNote:
      return {
        ...state,
        activeNote: null,
      };

    default:
      return state;
  }
};
