import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useDispatch } from 'react-redux';
import { saveNewNote } from '../../redux/actions/noteActions';
import { editorConfig } from '../../util/editorConfig';
import { AttachFile } from '@material-ui/icons';

export const NoteEdit = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState({
    title: '',
    body: '',
    folder: 10,
  });

  const handleInputChange = ({ target }) => {
    setValue({
      ...value,
      [target.name]: target.value,
    });
  };

  const handleNoteText = (data) => {
    setValue({
      ...value,
      body: data,
    });
  };

  const handleFolderChange = ({ target }) => {
    if (target.value === 'newFolder') {
      setOpen(true);
    } else {
      setValue({
        ...value,
        folder: target.value,
      });
    }
  };

  const noteValidation = () => {
    if (value.title.trim() === '' || value.body.trim() === '') {
      return false;
    }

    return true;
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (noteValidation()) {
      dispatch(saveNewNote(value));
    }
  };

  return (
    <div className="new__note">
      <TextField
        label="Titulo"
        variant="outlined"
        name="title"
        value={value.title}
        autoComplete="off"
        onChange={handleInputChange}
      />

      <CKEditor
        editor={ClassicEditor}
        data=""
        onBlur={(e, editor) => handleNoteText(editor.getData())}
        config={editorConfig}
      />
      <div className="note__footer">
        <div>
          <FormControl variant="outlined">
            <InputLabel id="folder">Carpeta</InputLabel>
            <Select
              labelId="folder"
              value={value.folder}
              name="folder"
              onChange={handleFolderChange}
              label="Carpeta"
            >
              <MenuItem value="newFolder">
                <em>Nueva carpeta</em>
              </MenuItem>
              <MenuItem value={10}>General</MenuItem>
              <MenuItem value={20}>Otro</MenuItem>
              <MenuItem value={30}>Nanai</MenuItem>
            </Select>
          </FormControl>
          <div>
            <input accept="image/*" id="icon-button-file" type="file" />
            <label htmlFor="icon-button-file">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <AttachFile />
              </IconButton>
            </label>
          </div>
        </div>
        <div>
          <Button variant="outlined">Cancelar</Button>
          <Button
            variant="contained"
            className="btn__save"
            onClick={handleSubmit}
          >
            Guardar
          </Button>
        </div>
      </div>

      <Dialog aria-labelledby="new-folder" open={open}>
        <DialogTitle id="new-folder">Crear carpeta</DialogTitle>
        <DialogContent>
          <TextField
            id="outlined-basic"
            label="Nombre de carpeta"
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleCloseDialog} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
