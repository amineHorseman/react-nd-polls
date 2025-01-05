import './App.css';
import Home from '../components/Home.js';
import Login from '../components/Login.js';
import Leaderboard from '../components/Leaderboard.js';
import AddQuestion from '../components/AddQuestion.js';
import Question from '../components/Question.js';
import QuestionsList from '../components/QuestionsList.js';
import Error404 from '../components/Error404.js';
import Nav from '../components/Nav.js';

import { Routes, Route, Navigate, useLocation } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuthedUserId } from '../features/auth/authSlice'
import { fetchUsers } from "../features/users/usersSlice";
import { useEffect } from 'react';

const App = () => {

  const RequireAuth = ({ children }) => {
    // check authedUser and redirect to Login page if null
    const location = useLocation();
    const authedUser = useSelector(selectAuthedUserId);
    return authedUser !== null ? children : 
      <Navigate to="/login" replace state={{ path: location.pathname }} />;
  }

  // load initial data
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="App">
      <Nav />
        <Routes>
          <Route path="/" exact element={<RequireAuth><Home /></RequireAuth>}>
            <Route index exact element={<QuestionsList />} />
            <Route path="/leaderboard" exact element={<Leaderboard />} />
            <Route path="/add" exact element={<AddQuestion />} />
            <Route path="/questions/:id" element={<Question />} />
          </Route>
          <Route path="/login" exact element={<Login />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
    </div>
  );
}

export default App;
