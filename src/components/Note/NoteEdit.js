import React, { useEffect, useState } from 'react';
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
import { saveCollection, saveNewNote } from '../../redux/actions/noteActions';
import { editorConfig } from '../../util/editorConfig';
import { noteModel } from '../../models/noteModel';

const noteInitial = {
  title: '',
  body: '',
  collection: '',
};

export const NoteEdit = ({ note, folders }) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [folderName, setFolderName] = useState(null);
  const [folderList, setFolderList] = useState([]);
  const [value, setValue] = useState(noteInitial);

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
    if (
      value.title.trim() === '' ||
      value.body.trim() === '' ||
      value.collection.trim() === ''
    ) {
      return false;
    }

    return true;
  };

  const handleCloseDialog = () => {
    if (folderName) {
      setValue({
        ...value,
        collection: folderName,
      });
      setFolderList([...folderList, folderName]);
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
      dispatch(saveNewNote({ ...noteModel, ...value }));
      if (folderName && folderList.length === 1) {
        dispatch(saveCollection(folderList));
      } else {
        dispatch(saveCollection(folderList, true));
      }

      setValue(noteInitial);
    }
  };

  useEffect(() => {
    setFolderList(folders);
  }, [folders]);

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
        <div className="note__select">
          <FormControl variant="outlined">
            <InputLabel id="folder">Carpeta</InputLabel>
            <Select
              labelId="folder"
              value={value.collection}
              name="collection"
              onChange={handleFolderChange}
              label="Carpeta"
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
