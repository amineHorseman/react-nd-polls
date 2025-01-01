import { combineReducers } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import usersSlice from '../features/users/usersSlice';
import questionsSlice from '../features/questions/questionsSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  users: usersSlice,
  questions: questionsSlice,
});

export default rootReducer;
