import React from 'react';
import { ArrowBack, Delete, Edit, Label } from '@material-ui/icons';
import { IconButton, Tooltip } from '@material-ui/core';

import { NoteEdit } from './NoteEdit';
import { useSelector } from 'react-redux';

export const Note = () => {
  const { activeNote, folders } = useSelector((state) => state.notes);

  return (
    <div className="note">
      {!activeNote || activeNote.id === '' ? (
        <NoteEdit note={activeNote} folders={folders} />
      ) : (
        <>
          <div className="note__actionbar">
            <ArrowBack />
            <div>
              <Tooltip title="Editar">
                <IconButton aria-label="editar">
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip title="Eliminar">
                <IconButton aria-label="eliminar">
                  <Delete />
                </IconButton>
              </Tooltip>
              <Tooltip title="Mover a">
                <IconButton aria-label="mover a">
                  <Label />
                </IconButton>
              </Tooltip>
            </div>
          </div>

          <div className="note__wrap">
            <h2 className="note__title">Beautiful memories of develop</h2>
            {/* <div dangerouslySetInnerHTML={{ __html: prueba }}></div> */}
          </div>
        </>
      )}
    </div>
  );
};
