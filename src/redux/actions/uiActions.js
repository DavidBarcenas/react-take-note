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

export const showFolderMobile = () => ({
  type: types.showFolderMobile,
});

export const showNotesMobile = () => ({
  type: types.showNotesMobile,
});

export const showNoteMobile = () => ({
  type: types.showNoteMobile,
});
