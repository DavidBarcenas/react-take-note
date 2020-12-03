import React from 'react';
import { IconButton } from '@material-ui/core';
import { deleteFile } from '../../providers/firebaseService';
import DeleteIcon from '@material-ui/icons/Delete';

export const FileListEdit = ({ files }) => {
  const handleDelete = (fileName) => {
    deleteFile(fileName);
  };

  return (
    <div className="files-list-edit">
      <h3>Archivos:</h3>
      {files.map((file, i) => (
        <div className="file-item-edit" key={i}>
          <a href={file.url} rel="noreferrer" target="_blank">
            {file.name}
          </a>
          <IconButton
            aria-label="Eliminar Archivo"
            onClick={() => handleDelete(file.name)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ))}
    </div>
  );
};
