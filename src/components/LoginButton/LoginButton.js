import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { loginSocialNetworks } from '../../redux/actions/authActions';
import { loginConstants } from '../../constants/loginConstants';
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
      {socialNetwork === loginConstants.google && (
        <img src={googleIcon} alt={socialNetwork} className="login-btn-icon" />
      )}
      {socialNetwork === loginConstants.twitter && (
        <Twitter className="login-btn-icon" />
      )}
      {socialNetwork === loginConstants.github && (
        <GitHub className="login-btn-icon" />
      )}
      Continuar con <span className="login-btn-name">{socialNetwork}</span>
    </Button>
  );
};
