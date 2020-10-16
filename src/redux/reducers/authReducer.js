import { types } from '../types/types';

const initialState = {
  name: null,
  uid: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.authLogin:
      return {
        ...state,
        name: action.payload.displayName,
        uid: action.payload.uid,
      };

    default:
      return state;
  }
};
