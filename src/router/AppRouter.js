import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { firebase } from '../providers/firebase';
import { login } from '../redux/actions/authActions';
import { userNotes } from '../redux/actions/noteActions';
import { Login } from '../views/Login';
import { Main } from '../views/Main';

export const AppRouter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName, user.email, user.photoURL));
        dispatch(userNotes());
      }
    });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/login" component={Login} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};
