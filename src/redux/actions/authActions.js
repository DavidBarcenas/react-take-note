import { firebase, socialNetworkProvider } from '../../providers/firebase';
import { types } from '../types/types';

export const loginSocialNetworks = (socialNetwok) => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(socialNetworkProvider(socialNetwok))
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
      })
      .catch((err) => {
        return false;
      });
  };
};

export const login = (uid, displayName) => ({
  type: types.authLogin,
  payload: {
    uid,
    displayName,
  },
});
