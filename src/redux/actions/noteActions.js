import { noteModel } from '../../models/noteModel';
import { types } from '../types/types';

export const createNote = () => ({
  type: types.createNote,
  payload: noteModel,
});
