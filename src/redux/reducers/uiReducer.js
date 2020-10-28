import { types } from '../types/types';

const initialState = {
  alert: {
    show: false,
    message: '',
    type: null,
  },
  loading: false,
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.showAlert:
      return {
        ...state,
        alert: {
          show: true,
          message: action.payload.message,
          type: action.payload.type,
        },
      };

    case types.hideAlert:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};
