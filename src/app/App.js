import './App.css';
import Nav from '../components/Nav.js';
import Home from '../components/Home.js';
import Login from '../components/Login.js';
import Register from '../components/Register';
import LoadingBar from 'react-top-loading-bar';
import Error404 from '../components/Error404.js';
import Leaderboard from '../components/Leaderboard.js';
import AddQuestion from '../components/AddQuestion.js';
import QuestionsList from '../components/QuestionsList.js';
import QuestionDetails from '../components/QuestionDetails.js';

import { selectAuthedUserId, selectAuthStatus, clearAuthStatus } from '../features/auth/authSlice';
import { clearQuestionsError, selectQuestionsError } from "../features/questions/questionsSlice";
import { clearUsersError, fetchUsers, selectUsersError } from "../features/users/usersSlice";
import { fetchQuestions } from "../features/questions/questionsSlice";
import { Routes, Route, Navigate, useLocation } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

const App = () => {
  const dispatch = useDispatch();
  const questionsError = useSelector(selectQuestionsError);
  const usersError = useSelector(selectUsersError);
  const authStatus = useSelector(selectAuthStatus);
  const [progressBarValue, setProgressBarValue] = useState(0);
  
  const RequireAuth = ({ children }) => {
    // check authedUser and redirect to Login page if null
    const location = useLocation();
    const authedUser = useSelector(selectAuthedUserId);
    return authedUser !== null ? children : 
      <Navigate to="/login" replace state={{ path: location.pathname }} />;
  }

  // load initial data
  useEffect(() => {
    setProgressBarValue(0);
    dispatch(fetchUsers());
    dispatch(fetchQuestions());
    setProgressBarValue(100);
  }, [dispatch]);

  // dismiss error notification
  useEffect(() => {
    if (usersError || questionsError) {
      const timer = setTimeout(() => {
        usersError && dispatch(clearUsersError());
        questionsError && dispatch(clearQuestionsError());
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [usersError, questionsError, dispatch]);

  // dismiss auth status notification
  useEffect(() => {
    if (authStatus) {
      const timer = setTimeout(() => {
        dispatch(clearAuthStatus());
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [authStatus, dispatch]);

  return (
    <div className="App">
      <LoadingBar color='red' progress={progressBarValue} />
      <Nav />
      <Routes>
          <Route path="/" exact element={<RequireAuth><Home /></RequireAuth>}>
            <Route index exact element={<QuestionsList />} />
            <Route path="/leaderboard" exact element={<Leaderboard />} />
            <Route path="/add" exact element={<AddQuestion setProgressBarValue={setProgressBarValue} />} />
            <Route path="/questions/:id" element={<QuestionDetails />} />
          </Route>
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Error404 />} />
      </Routes>
      {
        // show error notification
        (usersError || questionsError) && <div className="alert alert-danger position-fixed bottom-0 start-0 w-auto notification">
            An error occurred! Please try again.
        </div>
      }
      {
        // show auth status notification
        authStatus && <div className="alert alert-info position-fixed bottom-0 start-0 w-auto notification">
            {authStatus}
        </div>
      }
    </div>
  );
}

export default App;
