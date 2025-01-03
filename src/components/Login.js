import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logoutUser } from "../features/auth/authSlice";
import { selectUser } from "../features/users/usersSlice";

const Login = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // check logout action
    const searchParams = useSearchParams();
    const action =  searchParams.get('action')
    action === 'logout' && dispatch(logoutUser());

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const user = useSelector(state => selectUser(state, username));
    
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        setError('');
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!user) {
            setError('Username does not exist');
            return;
        }
        if (user.password !== password) {
            setError('Incorrect password');
            return;
        }
        dispatch(loginUser(username));
        navigate(location.state?.path || "/");
    };

    return <div className="container mt-5">
            <div className="row justify-content-center">
                {
                    error && <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                }
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
