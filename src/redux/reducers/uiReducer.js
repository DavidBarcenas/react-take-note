import { types } from '../types/types';

const initialState = {
  alert: {
    show: false,
    message: '',
    type: null,
    showLoader: false,
  },
  mobile: {
    showFolders: false,
    showNotes: false,
    showNote: false,
  },
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
        ...state,
        alert: {
          ...state.alert,
          show: false,
        },
      };

    case types.showLoader:
      return {
        ...state,
        showLoader: true,
      };

    case types.hideLoader:
      return {
        ...state,
        showLoader: false,
      };
    case types.showFolderMobile:
      return {
        ...state,
        mobile: {
          showFolders: true,
          showNotes: false,
          showNote: false,
        },
      };
    case types.showNotesMobile:
      return {
        ...state,
        mobile: {
          showFolders: false,
          showNotes: true,
          showNote: false,
        },
      };
    case types.showNoteMobile:
      return {
        ...state,
        mobile: {
          showFolders: false,
          showNotes: false,
          showNote: true,
        },
      };

    default:
      return state;
  }
};
