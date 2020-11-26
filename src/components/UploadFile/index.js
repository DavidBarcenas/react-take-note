import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';

export const UploadFile = () => {
  const uploadFile = (target) => {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef
      .child(`cghK1k38L4bLKTYkbqIZyPStDyf1/${target.files[0].name}`)
      .put(target.files[0]);

    let unsubcribe = uploadTask.on(
      'state_changed',
      (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        setProgress(progress);
      },
      (error) => {
        console.log('ocurrio un error al subir arvhivo', error);
        setProgress(0);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('File available at', downloadURL);

          const saveNote = {
            ...note,
            ...value,
            date: new Date(),
            files: [
              ...value.files,
              {
                name: target.files[0].name,
                url: downloadURL,
              },
            ],
          };
          console.log(saveNote);
          if (note.id !== '') {
            dispatch(updateNote(saveNote));
          } else {
            dispatch(saveNewNote(saveNote));
          }
        });
      }
    );
  };

  return (
    <div className="note__file__upload">
      <input id="icon-button-file" type="file" onChange={handleFile} />
      <Tooltip title="Subir archivo">
        <label htmlFor="icon-button-file">
          <IconButton
            color="primary"
            aria-label="subir archivo"
            component="span"
          >
            <AttachFile />
          </IconButton>
        </label>
      </Tooltip>
    </div>
  );
};
