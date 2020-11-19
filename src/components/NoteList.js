import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { AttachFile } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { dateFormat } from '../util/dateFormat';
import { activateNote } from '../redux/actions/noteActions';
import empty from '../assets/images/empty.svg';

export const NoteList = () => {
  const { notes, ui } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleActivateNote = (note) => {
    dispatch(activateNote(note));
  };

  return (
    <div className={`notelist ${!ui.mobile.showNotes ? 'no-show' : 'show'}`}>
      {notes.folderNotes.length > 0 ? (
        <List aria-label="Lista de notas">
          {notes.folderNotes.map((note) => (
            <ListItem
              key={note.id}
              button
              className={
                note.id === (notes.activeNote && notes.activeNote.id)
                  ? 'notelist-active'
                  : ''
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
      ) : (
        <div className="no-notes">
          <img src={empty} alt="No se encontraron notas" />
          <span>No se econtraron notas.</span>
        </div>
      )}
    </div>
  );
};
