import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { selectUser } from "../features/users/usersSlice";

const Login = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const user = useSelector(state => selectUser(state, username));
    
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (user && user['password'] === password) { 
            dispatch(loginUser(username));
            location.state? navigate(location.state["path"]) : navigate("/")
        }
    };

    return <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-4">Login</h3>
                            {   // Show notice if redirected from another page
                                location.state !== null && 
                                    <div className="alert alert-info">
                                        Please login to access this page.
                                    </div>
                            }
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input type="text" className="form-control" id="username" 
                                        placeholder="Enter username" onChange={handleUsernameChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password"
                                        placeholder="Enter password" onChange={handlePasswordChange} required />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
};

export default Login;
