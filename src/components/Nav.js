import './style.css';
import { NavLink } from "react-router-dom"

const Nav = ({authedUser}) => {
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
