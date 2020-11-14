import React from 'react';
import { CategorySidebar } from '../components/CategorySidebar';
import { NoteList } from '../components/NoteList';
import { TopBar } from '../components/TopBar';
import { Note } from '../components/Note/Note';
import { Alert } from '../components/Alert/Alert';
import { Loader } from '../components/Loader/Loader';

export const Main = () => {
  return (
    <div className="main__wrap">
      <TopBar />
      <Loader />

      <main className="main">
        <Alert />
        <CategorySidebar />
        <NoteList />
        <Note />
      </main>
    </div>
  );
};
