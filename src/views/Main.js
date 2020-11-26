import React from 'react';
import { Alert } from '../components/Alert/Alert';
import { TopBar } from '../components/TopBar';
import { BottomBar } from '../components/BottomBar';
import { Categories } from '../components/Categories';
import { NoteList } from '../components/NoteList';
import { Note } from '../components/Note';

export const Main = () => {
  return (
    <div className="main-wrap">
      <TopBar />

      <main className="main-content">
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
