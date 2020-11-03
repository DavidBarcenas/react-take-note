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
import {
  cancelNoteEdit,
  saveNewNote,
  updateNote,
} from '../../redux/actions/noteActions';
import { editorConfig } from '../../util/editorConfig';

export const NoteEdit = ({ note, folders }) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [folderName, setFolderName] = useState(null);
  const [folderList, setFolderList] = useState(folders);
  const [value, setValue] = useState({
    title: note.title,
    body: note.body,
    collection: note.collection,
  });
  const [formErrors, setFormErrors] = useState({
    titleError: false,
    bodyError: false,
    folderError: false,
  });
  const [folderNameError, setFolderNameError] = useState(true);

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
        collection: target.value,
      });
    }
  };

  const noteValidation = () => {
    setFormErrors({
      titleError: value.title.trim() === '',
      bodyError: value.body.trim() === '',
      folderError: value.collection.trim() === '',
    });

    if (value.title.trim() === '') {
      return false;
    }
    if (value.body.trim() === '') {
      return false;
    }
    if (value.collection.trim() === '') {
      return false;
    }

    return true;
  };

  const handleCloseDialog = () => {
    setFolderNameError(validFolderName(folderName));
    if (folderName) {
      setValue({
        ...value,
        collection: folderName,
      });
      setFolderList([...folderList, folderName]);
      setFolderName(null);
    }
    setOpen(false);
  };

  const handleFolderName = ({ target }) => {
    if (target.value.trim() !== '') {
      setFolderName(target.value);
    }
  };

  const validFolderName = (name) => {
    const regex = /^[A-Za-z0-9 ]*$/i;
    return regex.test(name);
  };

  const handleSubmit = () => {
    if (noteValidation()) {
      const saveNote = { ...note, ...value, date: new Date() };

      if (note.id !== '') {
        dispatch(updateNote(saveNote));
      } else {
        dispatch(saveNewNote(saveNote));
      }

      setFormErrors({
        titleError: false,
        bodyError: false,
        folderError: false,
      });
    }
  };

  const handleCancel = () => {
    dispatch(cancelNoteEdit());
    setFormErrors({
      titleError: false,
      bodyError: false,
      folderError: false,
    });
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
        error={formErrors.titleError}
      />

      <div className={formErrors.bodyError ? 'editor__error' : ''}>
        <CKEditor
          editor={ClassicEditor}
          data={value.body}
          onBlur={(e, editor) => handleNoteText(editor.getData())}
          config={editorConfig}
        />
      </div>
      <div className="note__footer">
        <div className="note__select">
          <FormControl variant="outlined">
            <InputLabel id="folder">Carpeta</InputLabel>
            <Select
              labelId="folder"
              value={value.collection}
              name="collection"
              onChange={handleFolderChange}
              label="Carpeta"
              error={formErrors.folderError}
            >
              <MenuItem value="newFolder">
                <em>Nueva carpeta</em>
              </MenuItem>
              {folderList.map((folder) => (
                <MenuItem key={folder} value={folder}>
                  {folder}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <Button variant="outlined" onClick={handleCancel}>
            Cancelar
          </Button>
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
            helperText={
              !folderNameError
                ? 'Solo se permiten letras, números y espacios'
                : ''
            }
            error={!folderNameError}
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
