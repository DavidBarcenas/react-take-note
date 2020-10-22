import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
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

export const NoteEdit = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [folderName, setFolderName] = useState(null);
  const [value, setValue] = useState({
    title: '',
    body: '',
    folder: 'general',
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
    if (folderName) {
      setValue({
        ...value,
        folder: folderName,
      });
    }
    setOpen(false);
  };

  const handleFolderName = ({ target }) => {
    if (target.value.trim() !== '') {
      setFolderName(target.value);
    }
  };

  const handleSubmit = () => {
    if (noteValidation()) {
      console.log(value);
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
              <MenuItem value="general">General</MenuItem>
              <MenuItem value="Otro">Otro</MenuItem>
              <MenuItem value="Nanai">Nanai</MenuItem>
              <MenuItem value="prueba">prueba</MenuItem>
            </Select>
          </FormControl>
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
            onChange={handleFolderName}
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
