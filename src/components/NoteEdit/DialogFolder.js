import React, { useState } from 'react';
import { constants } from '../../constants';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import { useSelector } from 'react-redux';

export const DialogFolder = () => {
  const { showModalFolder } = useSelector((state) => state.notes);
  const [folder, setFolder] = useState({
    name: '',
    error: null,
    open: false,
  });

  const handleFolderName = ({ target }) =>
    setFolder({ ...folder, name: target.value.trim() });

  const handleCloseModal = (buttonType) => {
    if (buttonType === constants.accept) {
      if (folder.name.length >= 3) {
        // action
      } else {
        setFolder({ ...folder, error: 'Debe tener minimo 3 caracteres' });
      }
    } else {
      setFolder({ name: '', error: null, open: false });
    }
  };

  return (
    <Dialog aria-labelledby="new-folder" open={showModalFolder}>
      <DialogTitle id="new-folder">{constants.createFolder}</DialogTitle>
      <DialogContent>
        <TextField
          id="outlined-basic"
          label="Nombre de carpeta"
          variant="outlined"
          onChange={handleFolderName}
          value={folder.name}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => handleCloseModal(constants.cancel)}
          color="primary"
        >
          {constants.cancel}
        </Button>
        <Button
          onClick={() => handleCloseModal(constants.accept)}
          color="primary"
        >
          {constants.accept}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
