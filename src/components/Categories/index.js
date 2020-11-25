import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotesFolder, newNote } from '../../redux/actions/noteActions';
import { showNotesMobile } from '../../redux/actions/uiActions';
import { noteModel } from '../../models/noteModel';
import { Folder } from '@material-ui/icons';
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

export const Categories = () => {
  const dispatch = useDispatch();
  const { notes, ui } = useSelector((state) => state);

  const createNoteBtn = () => dispatch(newNote(noteModel));

  const handleActivateFolder = (folder) => {
    dispatch(getNotesFolder(folder));
    dispatch(showNotesMobile());
  };

  return (
    <aside
      className={`categories ${!ui.mobile.showFolders ? 'no-show' : 'show'}`}
    >
      <div className="categories-btn">
        <Button onClick={createNoteBtn}>Crear nota</Button>
      </div>
      <div className="categories-folders">
        <List component="nav" aria-label="folders">
          {notes.folders.map((folder) => (
            <ListItem
              button
              className={folder === notes.activeFolder ? 'folder-active' : ''}
              key={folder}
              onClick={() => handleActivateFolder(folder)}
            >
              <ListItemIcon>
                <Folder />
              </ListItemIcon>
              <ListItemText primary={folder} />
            </ListItem>
          ))}
        </List>
      </div>
    </aside>
  );
};
