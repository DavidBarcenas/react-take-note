import React from 'react';
import { IconButton, InputBase } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';

export const SearchBar = () => {
  return (
    <div className="topbar__search">
      <InputBase
        placeholder="Buscar nota..."
        inputProps={{ 'aria-label': 'buscar nota' }}
      />
      <IconButton type="submit" aria-label="search">
        <SearchOutlined />
      </IconButton>
    </div>
  );
};
