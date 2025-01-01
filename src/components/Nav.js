import './style.css';
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom"
import { selectAuthedUser } from '../features/auth/authSlice';

const Nav = () => { 
    const authedUser = useSelector(selectAuthedUser);
    return (
      <nav>
        <NavLink to="/">Home</NavLink>
        {
          authedUser === null ? 
            <NavLink to="/login">Login</NavLink> :
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
