import React from 'react';
import { Button, TextField } from '@material-ui/core';
import googleIcon from '../assets/images/googleIcon.svg';
import stickyIcon from '../assets/images/stickyIcon.svg';

export const Login = () => {
  return (
    <div className="login">
      <div className="login__main">
        <div className="login__wrap">
          <img src={stickyIcon} alt="TakeNote" width="60" />
          <h1 className="login__title">Take Note</h1>
          <h3 className="login__subtitle">
            Captura todo lo que quieres manterner siempre a la mano.
          </h3>
          <Button className="login__btn-google" variant="outlined">
            <img src={googleIcon} alt="Google" />
            Continuar con google
          </Button>
          <span className="login__separate">o</span>
          <form className="login__form" noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label="Correo elecrónico"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Contraseña"
              variant="outlined"
            />
            <Button variant="contained">Iniciar sesión</Button>
          </form>
        </div>
      </div>
    </div>
  );
};
