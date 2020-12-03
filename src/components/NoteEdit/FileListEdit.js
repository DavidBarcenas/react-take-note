import React from 'react';
import { useDispatch } from 'react-redux';
import { IconButton } from '@material-ui/core';
import { removeFile } from '../../redux/actions/noteActions';
import DeleteIcon from '@material-ui/icons/Delete';

export const FileListEdit = ({ files }) => {
  const dispatch = useDispatch();

  const handleDelete = (fileName) => {
    dispatch(removeFile(fileName));
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
            onClick={() => handleDelete(file)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ))}
    </div>
  );
};
