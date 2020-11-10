import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { firebase } from '../providers/firebase';
import { login } from '../redux/actions/authActions';
import { userNotes } from '../redux/actions/noteActions';
import { Login } from '../views/Login';
import { Main } from '../views/Main';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { observable, uid } = useSelector((state) => state.auth);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName, user.email, user.photoURL));
        dispatch(userNotes());
      }
    });
  }, [dispatch]);

  if (observable) {
    return <div></div>;
  }

  return (
    <Router>
      <div>
        <Switch>
          <PrivateRoute isAuth={!!uid} exact path="/" component={Main} />
          <PublicRoute isAuth={!!uid} exact path="/login" component={Login} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};
