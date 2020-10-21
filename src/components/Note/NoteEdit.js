import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useDispatch } from 'react-redux';
import { saveNewNote } from '../../redux/actions/noteActions';
import { editorConfig } from '../../util/editorConfig';

export const NoteEdit = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState({
    title: '',
    body: '',
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

  const noteValidation = () => {
    if (value.title.trim() === '' || value.body.trim() === '') {
      return false;
    }

    return true;
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
        <Button variant="outlined">Cancelar</Button>
        <Button className="btn__save" onClick={handleSubmit}>
          Guardar
        </Button>
      </div>
    </div>
  );
};
