import { types } from '../types/types';

const initialState = {
  name: null,
  uid: null,
  email: null,
  photoUrl: null,
  observable: true,
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
        observable: false,
      };

    case types.authLogout:
      return {
        ...initialState,
        observable: false,
      };

    case types.observableNext:
      return {
        ...state,
        observable: false,
      };

    default:
      return state;
  }
};
