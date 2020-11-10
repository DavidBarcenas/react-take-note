import React, { useState } from 'react';
import { IconButton, useMediaQuery } from '@material-ui/core';
import { Clear, ExitToApp } from '@material-ui/icons';
import { SearchBar } from './SearchBar';
import Menu from '@material-ui/icons/Menu';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import stickyIcon from '../assets/images/stickyIcon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { logoutApp } from '../redux/actions/authActions';

export const TopBar = () => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.auth);
  const mq = useMediaQuery('(min-width:767px)');
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="header">
      <div className="topbar">
        <div className="topbar__logo">
          <div className="logo__wrap">
            <IconButton
              aria-label="delete"
              size="medium"
              className="topbar__menu"
            >
              <Menu fontSize="inherit" />
            </IconButton>

            <img src={stickyIcon} alt="Take Note" width="30" />
            <h1>Take Note</h1>
          </div>
          {mq && <SearchBar />}
        </div>

        <div className="topbar__btns">
          {name && (
            <div className="user">
              <span className="square">{name.substr(0, 1)}</span>
              <span className="user__name">{name}</span>
            </div>
          )}
          {!mq && (
            <IconButton
              type="button"
              aria-label="search"
              onClick={() => setShowSearch(!showSearch)}
            >
              {showSearch ? <Clear /> : <SearchOutlined />}
            </IconButton>
          )}
          <IconButton
            type="button"
            aria-label="exit"
            onClick={() => dispatch(logoutApp())}
          >
            <ExitToApp />
          </IconButton>
        </div>
      </div>

      {!mq && showSearch && <SearchBar />}
    </header>
  );
};
