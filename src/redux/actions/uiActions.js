import { types } from '../types/types';

export const showAlert = (message, type) => ({
  type: types.showAlert,
  payload: {
    message,
    type,
  },
});

export const hideAlert = () => ({
  type: types.hideAlert,
});
