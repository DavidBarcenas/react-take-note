import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { AttachFile } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { dateFormat } from '../util/dateFormat';
import { activateNote } from '../redux/actions/noteActions';

export const NoteList = () => {
  const { folderNotes, activeNote } = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  const handleActivateNote = (note) => {
    dispatch(activateNote(note));
  };

  return (
    <div className="notelist">
      <List aria-label="Lista de notas">
        {folderNotes.map((note) => (
          <ListItem
            key={note.id}
            button
            className={
              note.id === (activeNote && activeNote.id) ? 'notelist-active' : ''
            }
            onClick={() => handleActivateNote(note)}
          >
            <ListItemText primary={note.title} />
            <div className="notelist__date">
              {note.file && <AttachFile />}
              <span>{dateFormat(note.date)}</span>
            </div>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
