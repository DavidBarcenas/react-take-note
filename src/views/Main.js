import React from 'react';
import { CategorySidebar } from '../components/CategorySidebar';
import { NoteList } from '../components/NoteList';
import { Note } from '../components/Note';
import { TopBar } from '../components/TopBar';

export const Main = () => {
  return (
    <div className="main__wrap">
      <TopBar />

      <main className="main">
        <CategorySidebar />
        {/* <NoteList />
        <Note /> */}
      </main>
    </div>
  );
};
