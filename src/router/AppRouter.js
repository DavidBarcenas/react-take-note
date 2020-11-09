import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
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
  const [user, setUser] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user?.uid) {
        setUser(true);
        dispatch(login(user.uid, user.displayName, user.email, user.photoURL));
        dispatch(userNotes());
      } else {
        setUser(false);
      }
    });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Switch>
          <PrivateRoute isAuth={!!user} exact path="/" component={Main} />
          <PublicRoute isAuth={!!user} exact path="/login" component={Login} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};
