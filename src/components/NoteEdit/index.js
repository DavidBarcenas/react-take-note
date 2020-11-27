import React, { useEffect, useRef, useState } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useDispatch } from 'react-redux';
import { editorConfig } from '../../util/editorConfig';
import {
  cancelNoteEdit,
  saveNewNote,
  updateNote,
  showModalFCreateFolder,
} from '../../redux/actions/noteActions';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { DialogFolder } from './DialogFolder';

export const NoteEdit = ({ note, folderList }) => {
  const collection = useRef(note.collection);
  const dispatch = useDispatch();
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
  const [folders, setFolders] = useState(folderList);

  useEffect(() => {
    setValue(() => ({ ...note }));
    if (collection.current !== note.collection) {
      setFolders((folders) => [...folders, note.collection]);
    }
  }, [note]);

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
      dispatch(showModalFCreateFolder(true));
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
              {folders.map((folder) => (
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

      <DialogFolder />
    </div>
  );
};
