import './style.css';
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom"
import { selectAuthedUserId } from '../features/auth/authSlice';

const Nav = () => { 
    const authedUser = useSelector(selectAuthedUserId);
    return (
      <nav>
        <NavLink to="/">Home</NavLink>
        {
          authedUser !== null &&
            <>
              <NavLink to="/add">Add Question</NavLink>
              <NavLink to="/leaderboard">Leaderboard</NavLink>
              <NavLink to={{ pathname: "/login", search: "?action=logout" }}>Logout</NavLink>
            </>
        }
      </nav>
    );
};
  
export default Nav;
