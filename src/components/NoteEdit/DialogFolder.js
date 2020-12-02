import React, { useState } from 'react';
import { constants } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import {
  addFolder,
  showModalFCreateFolder,
} from '../../redux/actions/noteActions';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';

export const DialogFolder = () => {
  const dispatch = useDispatch();
  const showModalFolder = useSelector((state) => state.notes.showModalFolder);
  const folders = useSelector((state) => state.notes.folders);
  const [folder, setFolder] = useState({
    name: '',
    error: false,
  });

  const handleFolderName = ({ target }) =>
    setFolder({ ...folder, name: target.value.trim() });

  const handleCloseModal = (buttonType) => {
    if (buttonType === constants.accept) {
      const exist = folders.includes(folder.name.toLowerCase());
      if (folder.name.length >= 3 && !exist) {
        dispatch(addFolder(folder.name));
        dispatch(showModalFCreateFolder(false));
        setFolder({ name: '', error: false });
      } else {
        setFolder({
          ...folder,
          error: true,
        });
      }
    } else {
      setFolder({ name: '', error: false });
      dispatch(showModalFCreateFolder(false));
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
          error={folder.error}
          helperText={folder.error ? constants.folderNameError : ''}
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
