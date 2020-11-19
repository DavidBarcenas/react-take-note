import React from 'react';
import { IconButton } from '@material-ui/core';
import { Add, Folder, Note } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { showFolderMobile } from '../../redux/actions/uiActions';

export const BottomBar = () => {
  const dispatch = useDispatch();
  return (
    <div className="bottom__bar">
      <IconButton
        aria-label="folders"
        onClick={() => dispatch(showFolderMobile())}
      >
        <Folder />
      </IconButton>
      <IconButton aria-label="agregar">
        <Add />
      </IconButton>
      <IconButton aria-label="Notas">
        <Note />
      </IconButton>
    </div>
  );
};
