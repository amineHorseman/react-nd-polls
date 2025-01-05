import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logoutUser } from "../features/auth/authSlice";
import { selectUser } from "../features/users/usersSlice";

const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();

    // check logout action
    useEffect(() => {
        const action =  searchParams.get('action')
        action === 'logout' && dispatch(logoutUser());
    }, [searchParams, dispatch]);

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
                <div className="col-md-6 col-lg-4">
                    {
                        error && <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    }
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
                                    <input type="text" className="form-control" id="username" data-testid="username"
                                        placeholder="Enter username" onChange={handleUsernameChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" data-testid="password"
                                        placeholder="Enter password" onChange={handlePasswordChange} required />
                                </div>
                                <button type="submit" className="btn btn-primary w-100" data-testid="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
};

export default Login;
