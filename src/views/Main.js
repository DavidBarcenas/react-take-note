import React from 'react';
import { CategorySidebar } from '../components/CategorySidebar';
import { NoteList } from '../components/NoteList';
import { TopBar } from '../components/TopBar';
import { Note } from '../components/Note/Note';
import { Alert } from '../components/Alert/Alert';

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
    </div>
  );
};
