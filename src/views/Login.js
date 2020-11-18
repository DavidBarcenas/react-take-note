import React from 'react';
import { loginSocialNetworks } from '../redux/actions/authActions';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import googleIcon from '../assets/images/googleIcon.svg';
import stickyIcon from '../assets/images/stickyIcon.svg';
import { GitHub, Twitter } from '@material-ui/icons';
import { github, google, twitter } from '../const/constants';

export const Login = () => {
  const dispatch = useDispatch();

  const handleLogin = (socialNetwork) =>
    dispatch(loginSocialNetworks(socialNetwork));

  return (
    <div className="login">
      <div className="login__main">
        <div className="login__wrap">
          <img src={stickyIcon} alt="TakeNote" width="60" />
          <h1 className="login__title">Take Note</h1>
          <h3 className="login__subtitle">
            Captura todo lo que quieres manterner siempre a la mano.
          </h3>
          <Button
            className="login__btn-social"
            variant="outlined"
            onClick={() => handleLogin(google)}
          >
            <img src={googleIcon} alt="Google" className="login__btn-icon" />
            Continuar con google
          </Button>
          <Button
            className="login__btn-social twitter"
            variant="outlined"
            onClick={() => handleLogin(twitter)}
          >
            <Twitter className="login__btn-icon" />
            Continuar con twitter
          </Button>
          <Button
            className="login__btn-social git"
            variant="outlined"
            onClick={() => handleLogin(github)}
          >
            <GitHub className="login__btn-icon" />
            Continuar con github
          </Button>
        </div>
      </div>
    </div>
  );
};
