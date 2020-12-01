import React from 'react';
import { IconButton } from '@material-ui/core';
import { Add, Folder, Note } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { newNote } from '../../redux/actions/noteActions';
import { NoteModel } from '../../models/noteModel';
import {
  showFolderMobile,
  showNotesMobile,
  showNoteMobile,
} from '../../redux/actions/uiActions';

export const BottomBar = () => {
  const dispatch = useDispatch();
  return (
    <div className="bottom-bar">
      <IconButton
        aria-label="folders"
        onClick={() => dispatch(showFolderMobile())}
      >
        <Folder />
      </IconButton>
      <IconButton
        aria-label="agregar"
        onClick={() => {
          dispatch(newNote(NoteModel));
          dispatch(showNoteMobile());
        }}
      >
        <Add />
      </IconButton>
      <IconButton
        aria-label="notas"
        onClick={() => dispatch(showNotesMobile())}
      >
        <Note />
      </IconButton>
    </div>
  );
};
