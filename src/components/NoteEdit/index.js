import React, { useState } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useDispatch } from 'react-redux';
import { editorConfig } from '../../util/editorConfig';
import {
  cancelNoteEdit,
  saveNewNote,
  updateNote,
  showModalFolder,
} from '../../redux/actions/noteActions';
import {
  Button,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { DialogFolder } from './DialogFolder';

export const NoteEdit = ({ note, folders }) => {
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [folderName, setFolderName] = useState(null);
  const [folderList, setFolderList] = useState(folders);
  const [value, setValue] = useState({
    title: note.title,
    body: note.body,
    collection: note.collection,
    files: note.files || [],
  });
  const [formErrors, setFormErrors] = useState({
    titleError: false,
    bodyError: false,
    folderError: false,
  });
  const [folderNameError, setFolderNameError] = useState(true);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

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
      dispatch(showModalFolder(true));
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
    setOpenModal(false);
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

  const handleFile = ({ target }) => {
    if (target.files.length > 0) {
      if (
        target.files[0].type === 'application/pdf' ||
        target.files[0].type.slice(0, 5) === 'image'
      ) {
        setFile(target);
      } else {
        setFile(null);
      }
    }
    // uploadFile('cghK1k38L4bLKTYkbqIZyPStDyf1', target.files);
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
      {progress > 0 && (
        <LinearProgress variant="determinate" value={progress} />
      )}
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
          {/* UploadFile */}
        </div>
        <div className="note__footer--btns">
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

      <DialogFolder openModal={openModal} />
    </div>
  );
};
