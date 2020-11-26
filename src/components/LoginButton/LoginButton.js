import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { loginSocialNetworks } from '../../redux/actions/authActions';
import { constants } from '../../constants';
import { GitHub, Twitter } from '@material-ui/icons';
import googleIcon from '../../assets/images/googleIcon.svg';

export const LoginButton = ({ socialNetwork }) => {
  const dispatch = useDispatch();
  const handleLogin = (socialNetwork) =>
    dispatch(loginSocialNetworks(socialNetwork));

  return (
    <Button
      className={`login-btn-social ${socialNetwork}`}
      variant="outlined"
      onClick={() => handleLogin(socialNetwork)}
    >
      {socialNetwork === constants.google && (
        <img src={googleIcon} alt={socialNetwork} className="login-btn-icon" />
      )}
      {socialNetwork === constants.twitter && (
        <Twitter className="login-btn-icon" />
      )}
      {socialNetwork === constants.github && (
        <GitHub className="login-btn-icon" />
      )}
      Continuar con <span className="login-btn-name">{socialNetwork}</span>
    </Button>
  );
};
