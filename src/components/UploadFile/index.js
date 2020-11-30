import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { firebase } from '.././../providers/firebase';
import { IconButton, Tooltip } from '@material-ui/core';
import { AttachFile } from '@material-ui/icons';
import { saveFiles } from '../../redux/actions/noteActions';

export const UploadFile = () => {
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);

  const handleFile = ({ target }) => {
    if (target.files.length > 0) {
      if (
        target.files[0].type === 'application/pdf' ||
        target.files[0].type.slice(0, 5) === 'image'
      ) {
        // seleccionado
        uploadFileFs(target);
      } else {
        // no-seleccionado
      }
    }
  };

  const uploadFileFs = (target) => {
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
          console.log('el file', target.files[0]);
          dispatch(
            saveFiles({
              name: target.files[0].name,
              size: target.files[0].size,
              url: downloadURL,
            })
          );
        });
      }
    );
  };

  return (
    <div className="note-file-upload">
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
