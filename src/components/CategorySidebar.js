import React from 'react';
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { Folder } from '@material-ui/icons';
import { getNotesFolder, newNote } from '../redux/actions/noteActions';
import { useDispatch, useSelector } from 'react-redux';
import { noteModel } from '../models/noteModel';
import { showNotesMobile } from '../redux/actions/uiActions';

export const CategorySidebar = () => {
  const dispatch = useDispatch();
  const { notes, ui } = useSelector((state) => state);

  const createNoteBtn = () => dispatch(newNote(noteModel));
  const handleActivateFolder = (folder) => {
    dispatch(getNotesFolder(folder));
    dispatch(showNotesMobile());
  };

  return (
    <aside className={`sidebar ${!ui.mobile.showFolders ? 'no-show' : 'show'}`}>
      <div className="sidebar__btn">
        <Button onClick={createNoteBtn}>Crear nota</Button>
      </div>
      <div className="sidebar__folders">
        <List component="nav" aria-label="main folders">
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
