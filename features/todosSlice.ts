import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../apps/store';

type Todo = {
  id: string;
  title: string;
  isDone: boolean;
};

type TodosList = Array<Todo>;

const initialState: TodosList = [];

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    removeTodo: (state, action) => {
      const id = action.payload;
      return state.filter((e) => e.id !== id);
    },
    toggleDoneTodo: (state, action) => {
      const id = action.payload;
      const index = state.map((e) => e.id).indexOf(id);
      state[index].isDone = !state[index].isDone;
    },
  },
});

export const selectTotos = (state: RootState) => state.todosLister;

export const { addTodo, removeTodo, toggleDoneTodo } = todosSlice.actions;

export default todosSlice.reducer;
