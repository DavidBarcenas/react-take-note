import { firebase, googleAuthProvider } from '../../providers/firebase';
import { types } from '../types/types';

export const logintWithGoogle = () => {
  return (dispatch) => {
    try {
      firebase
        .auth()
        .signInWithPopup(googleAuthProvider)
        .then(({ user }) => {
          dispatch(login(user.uid, user.displayName));
        });
    } catch (error) {
      console.log('Error login:', error);
    }
  };
};

export const login = (uid, displayName) => ({
  type: types.authLogin,
  payload: {
    uid,
    displayName,
  },
});
