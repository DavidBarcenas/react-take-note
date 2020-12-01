import React from 'react';
import { Alert } from '../components/Alert/Alert';
import { TopBar } from '../components/TopBar';
import { BottomBar } from '../components/BottomBar';
import { Categories } from '../components/Categories';
import { NoteList } from '../components/NoteList';
import { Note } from '../components/Note';
import { Loader } from '../components/Loader/Loader';

export const Main = () => {
  return (
    <div className="main-wrap">
      <TopBar />

      <main className="main-content">
        <Loader />
        <Alert />
        <Categories />
        <NoteList />
        <Note />
      </main>

      <div className="bottom-bar-wrap">
        <BottomBar />
      </div>
    </div>
  );
};
