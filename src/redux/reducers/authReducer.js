import { types } from '../types/types';

const initialState = {
  name: null,
  uid: null,
  email: null,
  photoUrl: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.authLogin:
      return {
        ...state,
        name: action.payload.displayName,
        uid: action.payload.uid,
        email: action.payload.email,
        photoUrl: action.payload.photoUrl,
      };

    default:
      return state;
  }
};
