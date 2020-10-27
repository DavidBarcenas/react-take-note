import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { AttachFile } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { dateFormat } from '../util/dateFormat';

export const NoteList = () => {
  const { folderNotes, activeNote } = useSelector((state) => state.notes);
  return (
    <div className="notelist">
      <List aria-label="Lista de notas">
        {folderNotes.map((note) => (
          <ListItem
            key={note.id}
            button
            className={note.id === activeNote.id ? 'notelist-active' : ''}
          >
            <ListItemText primary={note.title} />
            <div className="notelist__date">
              <AttachFile />
              <span>{dateFormat(note.date)}</span>
            </div>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
