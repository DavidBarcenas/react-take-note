import React, { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { deleteNote, newNote } from '../../redux/actions/noteActions';
import { constants } from '../../constants';
import { NoteEdit } from '../NoteEdit';
import notesIcon from '../../assets/images/notesIcon.svg';
import { NoteView } from './NoteView';
import { DialogDeleteNote } from './DialogDeleteNote';

export const Note = () => {
  console.log('SE RENDERIZA ==== NOTE ===');
  const dispatch = useDispatch();
  const [openDelete, setOpenDelete] = useState(false);
  const showNote = useSelector((state) => state.ui.mobile.showNote);
  const { activeNote, folders, files, editNote } = useSelector(
    (state) => state.notes,
    shallowEqual
  );

  const handleEdit = () => dispatch(newNote(activeNote));

  const handleDelete = () => {
    dispatch(deleteNote());
    setOpenDelete(false);
  };

  if (!activeNote) {
    return (
      <div className="note note-empty">
        <img src={notesIcon} alt={constants.writeNote} />
        <span>{constants.takingNote}</span>
      </div>
    );
  }
  return (
    <div
      className={`note fade-in ${!showNote ? 'no-show' : 'show'}`}
      key={activeNote.id}
    >
      {activeNote && editNote ? (
        <NoteEdit note={activeNote} folderList={folders} files={files} />
      ) : (
        <NoteView
          note={activeNote}
          edit={handleEdit}
          openModal={setOpenDelete}
        />
      )}

      <DialogDeleteNote
        openDialog={openDelete}
        closeDialog={setOpenDelete}
        deleteNote={handleDelete}
        noteTitle={activeNote.title}
      />
    </div>
  );
};
