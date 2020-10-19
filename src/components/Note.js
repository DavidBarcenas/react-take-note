import React from 'react';
import { ArrowBack, Delete, Edit, Label } from '@material-ui/icons';
import { Button, IconButton, Tooltip } from '@material-ui/core';
import { useNoteSelector } from '../redux/selectors/notesSelector';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export const Note = () => {
  const { activeNote } = useNoteSelector();
  const prueba =
    '<p>Hello from CKEditor 5!dsf</p><ul><li>que hay de new</li><li>por aqui</li></ul>';
  return (
    <div className="note">
      <div className="note__actionbar">
        <ArrowBack />
        <div>
          <Tooltip title="Editar">
            <IconButton aria-label="editar">
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar">
            <IconButton aria-label="eliminar">
              <Delete />
            </IconButton>
          </Tooltip>
          <Tooltip title="Mover a">
            <IconButton aria-label="mover a">
              <Label />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      <div className="note__wrap">
        <h2 className="note__title">Beautiful memories of develop</h2>

        {/* <div dangerouslySetInnerHTML={{ __html: prueba }}></div> */}

        <CKEditor
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
            console.log('Blur.', editor);
          }}
          onFocus={(event, editor) => {
            console.log('Focus.', editor);
          }}
        />
      </div>

      <div className="note__footer">
        <Button variant="outlined">Cancelar</Button>
        <Button className="btn__save">Guardar</Button>
      </div>
    </div>
  );
};
