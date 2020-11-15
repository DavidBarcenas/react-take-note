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

export const showLoader = () => ({
  type: types.showLoader,
});

export const hideLoader = () => ({
  type: types.hideLoader,
});
