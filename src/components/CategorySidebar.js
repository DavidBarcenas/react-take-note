import React from 'react';
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { Folder } from '@material-ui/icons';
import { newNote } from '../redux/actions/noteActions';
import { useDispatch, useSelector } from 'react-redux';

export const CategorySidebar = () => {
  const dispatch = useDispatch();
  const { folders, activeFolder } = useSelector((state) => state.notes);

  const createNoteBtn = () => dispatch(newNote());

  return (
    <aside className="sidebar">
      <div className="sidebar__btn">
        <Button onClick={createNoteBtn}>Crear nota</Button>
      </div>
      <div className="sidebar__folders">
        <List component="nav" aria-label="main folders">
          {folders.map((folder) => (
            <ListItem
              button
              className={folder == activeFolder ? 'folder-active' : ''}
              key={folder}
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
