import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { constants } from '../../constants';
import { Delete, Edit } from '@material-ui/icons';

export const NoteView = ({ note, edit, openModal }) => {
  return (
    <div className="note-view">
      <div className="note-actionbar">
        <Tooltip title={constants.edit}>
          <IconButton aria-label={constants.edit} onClick={edit}>
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title={constants.delete}>
          <IconButton
            aria-label={constants.delete}
            onClick={() => openModal(true)}
          >
            <Delete />
          </IconButton>
        </Tooltip>
      </div>

      <div className="note-wrap">
        <h2 className="note-title">{note.title}</h2>
        <div
          className="note-body"
          dangerouslySetInnerHTML={{ __html: note.body }}
        ></div>
      </div>
    </div>
  );
};
