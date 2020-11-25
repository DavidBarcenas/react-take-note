import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, useMediaQuery } from '@material-ui/core';
import { Clear, ExitToApp } from '@material-ui/icons';
import { SearchBar } from '../SearchBar';
import { Loader } from '../Loader/Loader';
import { logoutApp } from '../../redux/actions/authActions';
import { loginConstants } from '../../constants/loginConstants';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import stickyIcon from '../../assets/images/stickyIcon.svg';

export const TopBar = () => {
  const dispatch = useDispatch();
  const { auth, ui } = useSelector((state) => state);
  const [showSearch, setShowSearch] = useState(false);
  const mq = useMediaQuery('(min-width:767px)');

  return (
    <header className="header">
      <div className="topbar">
        <div className="topbar-logo">
          <div className="topbar-logo-wrap">
            <img src={stickyIcon} alt={loginConstants.title} width="30" />
            <h1>{loginConstants.title}</h1>
          </div>
          {mq && <SearchBar />}
        </div>

        <div className="topbar-btns">
          <div>{ui.showLoader && <Loader />}</div>

          <div className="user-account">
            {auth.name && (
              <div className="user">
                <span className="square">{auth.name.substr(0, 1)}</span>
                <span className="user-name">{auth.name}</span>
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
      </div>

      {!mq && showSearch && <SearchBar />}
    </header>
  );
};