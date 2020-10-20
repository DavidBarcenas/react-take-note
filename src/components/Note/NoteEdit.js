import React from 'react';
import { useForm } from '../hooks/useForm';
import { Button, TextField } from '@material-ui/core';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export const NoteEdit = () => {
  const [values, handleInputChange] = useForm({
    title: '',
    body: '',
  });

  const handleSubmit = () => {
    console.log('formVal::', values);
  };

  console.log({ state: values });

  return (
    <div className="new__note">
      <form action="">
        <TextField
          label="Titulo"
          variant="outlined"
          name="title"
          value={values.title}
          onChange={handleInputChange}
        />
      </form>
      {/* <CKEditor
        editor={ClassicEditor}
        data="<p>Hello from CKEditor 5!</p>"
        onInit={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log({ event, editor, data });
        }}
        onBlur={(event, editor) => {
          console.log('Blur.', { editor, event: editor.getData() });
        }}
        onFocus={(event, editor) => {
          console.log('Focus.', editor);
        }}
      /> */}
      <div className="note__footer">
        <Button variant="outlined">Cancelar</Button>
        <Button className="btn__save">Guardar</Button>
      </div>
    </div>
  );
};
