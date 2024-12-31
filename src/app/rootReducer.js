import { combineReducers } from '@reduxjs/toolkit';
import usersSlice from '../features/users/usersSlice';
import questionsSlice from '../features/questions/questionsSlice';

const rootReducer = combineReducers({
  users: usersSlice.reducer,
  questions: questionsSlice.reducer,
});

export default rootReducer;