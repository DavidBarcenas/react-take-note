import { firebase, socialNetworkProvider } from '../../providers/firebase';
import { types } from '../types/types';
import { resetNotes } from '../actions/noteActions';

export const loginSocialNetworks = (socialNetwok) => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(socialNetworkProvider(socialNetwok))
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName, user.email, user.photoURL));
      })
      .catch((err) => {
        return false;
      });
  };
};

export const login = (uid, displayName, email, photoUrl) => ({
  type: types.authLogin,
  payload: {
    uid,
    displayName,
    email,
    photoUrl,
  },
});

export const observableNext = () => ({
  type: types.observableNext,
});

export const logoutApp = () => {
  return (dispatch) => {
    firebase.auth().signOut();
    dispatch(resetNotes());
    dispatch(logout());
  };
};

const logout = () => ({
  type: types.authLogout,
});
