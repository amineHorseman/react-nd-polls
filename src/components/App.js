import './App.css';
import Home from './Home';
import Login from './Login';
import Leaderboard from './Leaderboard';
import AddQuestion from './AddQuestion';
import Question from './Question';
import Error404 from './Error404';
import Nav from './Nav.js';

import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

const App = (props) => {
  const [authedUser, setAuthedUser] = useState("mtsamis"); //TODO: remove later

  function RequireAuth({ children }) {
    const location = useLocation();
    return authedUser !== null ? children : 
      <Navigate to="/login" replace state={{ path: location.pathname }} />;
  }
  
  return (
    <div className="App">
      <Nav authedUser={authedUser} />
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
