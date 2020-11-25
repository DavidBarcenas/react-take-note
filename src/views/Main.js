import React from 'react';
import { CategorySidebar } from '../components/CategorySidebar';
import { NoteList } from '../components/NoteList';
import { Note } from '../components/Note/Note';
import { Alert } from '../components/Alert/Alert';
import { TopBar } from '../components/TopBar';
import { BottomBar } from '../components/BottomBar';

export const Main = () => {
  return (
    <div className="main-wrap">
      <TopBar />

      <main className="main-content">
        <Alert />
        <CategorySidebar />
        <NoteList />
        <Note />
      </main>

      <div className="bottom-bar-wrap">
        <BottomBar />
      </div>
    </div>
  );
};
