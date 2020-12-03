import React, { useEffect, useRef, useState } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useDispatch } from 'react-redux';
import { editorConfig } from '../../util/editorConfig';
import { DialogFolder } from './DialogFolder';
import { constants } from '../../constants';
import { UploadFile } from '../UploadFile';
import { deleteFile } from '../../providers/firebaseService';
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

export const NoteEdit = ({ note, folderList, files }) => {
  console.log('SE RENDERIZA ==== NOTEEDIT ===');
  const collection = useRef(note.collection);
  const dispatch = useDispatch();
  const [value, setValue] = useState({
    title: note.title,
    body: note.body,
    collection: note.collection,
    files: note.files,
  });
  const [formErrors, setFormErrors] = useState({
    titleError: false,
    bodyError: false,
    folderError: false,
  });
  const [folders, setFolders] = useState(folderList);

  useEffect(() => {
    if (collection.current !== note.collection) {
      setFolders((folders) => [...folders, note.collection]);
      setValue((value) => ({ ...value, collection: note.collection }));
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
    if (target.value === constants.newFolder) {
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

    if (
      value.title.trim() === '' ||
      value.body.trim() === '' ||
      value.collection.trim() === ''
    ) {
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (noteValidation()) {
      const saveNote = {
        ...note,
        ...value,
        date: new Date(),
        files: [...note.files, ...files],
      };

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
    if (files.length > 0) {
      files.map((file) => deleteFile(file.name));
    }
  };

  return (
    <div className="new-note">
      <TextField
        label="Titulo"
        variant="outlined"
        name="title"
        value={value.title}
        autoComplete="off"
        onChange={handleInputChange}
        error={formErrors.titleError}
      />

      <div className={formErrors.bodyError ? 'editor-error' : ''}>
        <CKEditor
          editor={ClassicEditor}
          data={value.body}
          onBlur={(e, editor) => handleNoteText(editor.getData())}
          config={editorConfig}
        />
      </div>

      <div className="note-footer">
        <div className="note-select">
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
              <MenuItem value={constants.newFolder}>
                <em>Nueva carpeta</em>
              </MenuItem>
              {folders.map((folder) => (
                <MenuItem key={folder} value={folder}>
                  {folder}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <UploadFile />
        </div>
        <div className="note-footer-btns">
          <Button variant="outlined" onClick={handleCancel}>
            {constants.cancel}
          </Button>
          <Button
            variant="contained"
            className="btn-save"
            onClick={handleSubmit}
          >
            {constants.save}
          </Button>
        </div>
      </div>
      {/* <h3>Archivos:</h3>
      <div className="files-list">
        {note.files.map((file) => (
          <a href={file.url} rel="noreferrer" target="_blank">
            Prueba
          </a>
        ))}
      </div> */}

      <DialogFolder />
    </div>
  );
};
