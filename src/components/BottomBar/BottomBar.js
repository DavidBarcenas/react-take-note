import React from 'react';
import { IconButton } from '@material-ui/core';
import { Add, Folder, Note } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import {
  showFolderMobile,
  showNotesMobile,
  showNoteMobile,
} from '../../redux/actions/uiActions';
import { newNote } from '../../redux/actions/noteActions';
import { noteModel } from '../../models/noteModel';

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
      <IconButton
        aria-label="agregar"
        onClick={() => {
          dispatch(newNote(noteModel));
          dispatch(showNoteMobile());
        }}
      >
        <Add />
      </IconButton>
      <IconButton
        aria-label="Notas"
        onClick={() => dispatch(showNotesMobile())}
      >
        <Note />
      </IconButton>
    </div>
  );
};
