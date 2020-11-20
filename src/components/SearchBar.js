import React, { useState } from 'react';
import { IconButton, InputBase } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { getAll } from '../redux/actions/noteActions';
import { showNotesMobile } from '../redux/actions/uiActions';

export const SearchBar = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState({
    search: '',
  });

  const handleOnChange = ({ target }) => {
    setValue({
      ...value,
      [target.name]: target.value,
    });
  };

  const handleSubmit = () => {
    if (value.search.length > 3) {
      dispatch(getAll(value.search));
      dispatch(showNotesMobile());
    }
  };

  return (
    <div className="topbar__search">
      <InputBase
        placeholder="Buscar nota..."
        inputProps={{ 'aria-label': 'buscar nota' }}
        autoComplete="off"
        name="search"
        value={value.search}
        onChange={handleOnChange}
      />
      <IconButton type="button" aria-label="search" onClick={handleSubmit}>
        <SearchOutlined />
      </IconButton>
    </div>
  );
};
