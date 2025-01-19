import './App.css';
import Nav from '../components/Nav.js';
import Home from '../components/Home.js';
import Login from '../components/Login.js';
import Error404 from '../components/Error404.js';
import Leaderboard from '../components/Leaderboard.js';
import AddQuestion from '../components/AddQuestion.js';
import QuestionsList from '../components/QuestionsList.js';
import QuestionDetails from '../components/QuestionDetails.js';

import { clearError, selectQuestionsError } from "../features/questions/questionsSlice";
import { fetchQuestions } from "../features/questions/questionsSlice";
import { Routes, Route, Navigate, useLocation } from 'react-router';
import { selectAuthedUserId } from '../features/auth/authSlice';
import { fetchUsers } from "../features/users/usersSlice";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

const App = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectQuestionsError);

  const RequireAuth = ({ children }) => {
    // check authedUser and redirect to Login page if null
    const location = useLocation();
    const authedUser = useSelector(selectAuthedUserId);
    return authedUser !== null ? children : 
      <Navigate to="/login" replace state={{ path: location.pathname }} />;
  }

  // load initial data
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchQuestions());
  }, [dispatch]);

  // dismiss error notification
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  return (
    <div className="App">
      <Nav />
      <Routes>
          <Route path="/" exact element={<RequireAuth><Home /></RequireAuth>}>
            <Route index exact element={<QuestionsList />} />
            <Route path="/leaderboard" exact element={<Leaderboard />} />
            <Route path="/add" exact element={<AddQuestion />} />
            <Route path="/questions/:id" element={<QuestionDetails />} />
          </Route>
          <Route path="/login" exact element={<Login />} />
          <Route path="*" element={<Error404 />} />
      </Routes>
      {
        // show error notification
        error && <div className="alert alert-danger position-fixed bottom-0 start-0 w-auto" Style="margin-left: 10px;">
            An error occurred! Please try again.
        </div>
      }
    </div>
  );
}

export default App;
