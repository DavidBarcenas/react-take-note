import React from 'react';
import { CategorySidebar } from '../components/CategorySidebar';
import { NoteList } from '../components/NoteList';
import { TopBar } from '../components/TopBar';
import { Note } from '../components/Note/Note';
import { Alert } from '../components/Alert/Alert';
import { BottomBar } from '../components/BottomBar/BottomBar';

export const Main = () => {
  return (
    <div className="main__wrap">
      <TopBar />

      <main className="main">
        <Alert />
        <CategorySidebar />
        <NoteList />
        <Note />
      </main>

      <div className="bottom__bar__wrap">
        <BottomBar />
      </div>
    </div>
  );
};
