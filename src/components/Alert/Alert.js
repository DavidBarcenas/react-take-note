import React from 'react';
import { Snackbar } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { CheckCircle, Error } from '@material-ui/icons';
import { hideAlert } from '../../redux/actions/uiActions';

export const Alert = () => {
  const { alert } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const handleClose = () => dispatch(hideAlert());

  return (
    <Snackbar
      className={`note__alert ${alert.type ? 'note__' + alert.type : ''}`}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={alert.show}
      autoHideDuration={4000}
      onClose={handleClose}
      message={
        <>
          {alert.type === 'success' ? <CheckCircle /> : <Error />}
          <span>{alert.message}</span>
        </>
      }
    />
  );
};
