import React from 'react';
import { loginConstants } from '../constants/loginConstants';
import { LoginButton } from '../components/LoginButton/LoginButton';
import stickyIcon from '../assets/images/stickyIcon.svg';

export const Login = () => {
  return (
    <div className="login">
      <div className="login-main">
        <div className="login-wrap">
          <img src={stickyIcon} alt={loginConstants.title} width="60" />
          <h1 className="login-title">{loginConstants.title}</h1>
          <h3 className="login-subtitle">{loginConstants.subtitle}</h3>
          <LoginButton socialNetwork={loginConstants.google} />
          <LoginButton socialNetwork={loginConstants.twitter} />
          <LoginButton socialNetwork={loginConstants.github} />
        </div>
      </div>
    </div>
  );
};
