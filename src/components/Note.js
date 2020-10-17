import React from 'react';
import { ArrowBack, Delete, Edit, Label } from '@material-ui/icons';
import { Button, IconButton, Tooltip } from '@material-ui/core';
import { useNoteSelector } from '../redux/selectors/notesSelector';

export const Note = () => {
  const { activeNote } = useNoteSelector();

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
        <p className="note__body">
          Lorem Ipsum es simplemente el texto de relleno de las imprentas y
          archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de
          las industrias desde el año 1500, cuando un impresor (N. del T.
          persona que se dedica a la imprenta) desconocido usó una galería de
          textos y los mezcló de tal manera que logró hacer un libro de textos
          especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como
          texto de relleno en documentos electrónicos, quedando esencialmente
          igual al original. Fue popularizado en los 60s con la creación de las
          hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más
          recientemente con software de autoedición, como por ejemplo Aldus
          PageMaker, el cual incluye versiones de Lorem Ipsum.
        </p>
      </div>

      <div className="note__footer">
        <Button variant="outlined">Cancelar</Button>
        <Button className="btn__save">Guardar</Button>
      </div>
    </div>
  );
};
