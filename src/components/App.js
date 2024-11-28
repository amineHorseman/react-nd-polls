import './App.css';
import Home from './Home';
import Login from './Login';
import Leaderboard from './Leaderboard';
import AddQuestion from './AddQuestion';
import Question from './Question';
import Error404 from './Error404';

import { Routes, Route } from 'react-router-dom';

const App = (props) => {
  return (
    <div className="App">
      {
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/leaderboard" exact element={<Leaderboard />} />
          <Route path="/add" exact element={<AddQuestion />} />
          <Route path="/questions/:id" element={<Question />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      }
    </div>
  );
}

export default App;
