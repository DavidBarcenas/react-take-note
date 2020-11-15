import React from 'react';
import { CategorySidebar } from '../components/CategorySidebar';
import { NoteList } from '../components/NoteList';
import { TopBar } from '../components/TopBar';
import { Note } from '../components/Note/Note';
import { Alert } from '../components/Alert/Alert';
import { Loader } from '../components/Loader/Loader';
import { useSelector } from 'react-redux';

export const Main = () => {
  const { showLoader } = useSelector((state) => state.ui);
  return (
    <div className="main__wrap">
      <TopBar />
      {showLoader && <Loader />}

      <main className="main">
        <Alert />
        <CategorySidebar />
        <NoteList />
        <Note />
      </main>
    </div>
  );
};
