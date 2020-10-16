import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
  apiKey: NODE_ENV.REACT_APP_APIKEY,
  authDomain: NODE_ENV.REACT_APP_AUTHDOMAIN,
  databaseURL: NODE_ENV.REACT_APP_DATABASEURL,
  projectId: NODE_ENV.REACT_APP_PROJECTID,
  storageBucket: NODE_ENV.REACT_APP_STORAGEBUCKET,
  messagingSenderId: NODE_ENV.REACT_APP_MESSAGINGSENDERID,
  appId: NODE_ENV.REACT_APP_APPID,
  measurementId: NODE_ENV.REACT_APP_MEASUREMENTID,
};

firebase.initializeApp(firebaseConfig);
// firebase.analytics();

const googleAuthProvider = new firebase.auth.googleAuthProvider();
const db = firebase.firestore();

export { db, googleAuthProvider, firebase };
