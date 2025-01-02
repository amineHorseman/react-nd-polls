import './App.css';
import Home from '../components/Home.js';
import Login from '../components/Login.js';
import Leaderboard from '../components/Leaderboard.js';
import AddQuestion from '../components/AddQuestion.js';
import Question from '../components/Question.js';
import Error404 from '../components/Error404.js';
import Nav from '../components/Nav.js';

import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuthedUser } from '../features/auth/authSlice'
import { fetchUsers } from "../features/users/usersSlice";
import { useEffect } from 'react';

const App = (props) => {

  const RequireAuth = ({ children }) => {
    // check authedUser and redirect to Login page if null
    const location = useLocation();
    const authedUser = useSelector(selectAuthedUser);
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
          <Route path="/" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/leaderboard" exact 
            element={<RequireAuth><Leaderboard /></RequireAuth>} />
          <Route path="/add" exact 
            element={<RequireAuth><AddQuestion /></RequireAuth>} />
          <Route path="/questions/:id" 
            element={<RequireAuth><Question /></RequireAuth>} />
          <Route path="*" element={<Error404 />} />
        </Routes>
    </div>
  );
}

export default App;
