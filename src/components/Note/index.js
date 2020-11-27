import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNote, newNote } from '../../redux/actions/noteActions';
import { constants } from '../../constants';
import { NoteEdit } from '../NoteEdit';
import notesIcon from '../../assets/images/notesIcon.svg';
import { NoteView } from './NoteView';
import { DialogDeleteNote } from './DialogDeleteNote';

export const Note = () => {
  const dispatch = useDispatch();
  const [openDelete, setOpenDelete] = useState(false);
  const { notes, ui } = useSelector((state) => state);

  const handleEdit = () => dispatch(newNote(notes.activeNote));

  const handleDelete = () => {
    dispatch(deleteNote());
    setOpenDelete(false);
  };

  if (!notes.activeNote) {
    return (
      <div className="note note-empty">
        <img src={notesIcon} alt={constants.writeNote} />
        <span>{constants.takingNote}</span>
      </div>
    );
  }
  return (
    <div
      className={`note fade-in ${!ui.mobile.showNote ? 'no-show' : 'show'}`}
      key={notes.activeNote.id}
    >
      {notes.activeNote && notes.editNote ? (
        <NoteEdit note={notes.activeNote} folderList={notes.folders} />
      ) : (
        <NoteView
          note={notes.activeNote}
          edit={handleEdit}
          openModal={setOpenDelete}
        />
      )}

      <DialogDeleteNote
        openDialog={openDelete}
        closeDialog={setOpenDelete}
        deleteNote={handleDelete}
        noteTitle={notes.activeNote.title}
      />
    </div>
  );
};
