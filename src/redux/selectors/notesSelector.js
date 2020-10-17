import { useSelector } from 'react-redux';

export const useNoteSelector = () => {
  const { allNotes, activeNote } = useSelector((state) => state.notes);
  return { allNotes, activeNote };
};
