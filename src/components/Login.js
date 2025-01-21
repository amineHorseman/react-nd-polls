import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/users/usersSlice";
import { loginUser, logoutUser } from "../features/auth/authSlice";
import { useLocation, useNavigate, useSearchParams } from "react-router";

const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const [formState, setFormState] = useState({
        username: '',
        password: '',
        error: '',
        infoMessage: ''
    });
    const user = useSelector(state => selectUser(state, formState.username));

    useEffect(() => {
        // check logout action
        const action = searchParams.get('action');
        if (action === 'logout') {
            dispatch(logoutUser());
            setFormState(formState => ({...formState, 
                infoMessage: '', error: ''}));
        }
        else {
            location.state && setFormState(formState => ({...formState,
                infoMessage: 'Please login to access this page.',
                error: ''}));
        }
    }, [searchParams, location.state, dispatch]);

    const handleUsernameChange = (e) => {
        setFormState(formState => ({...formState, 
            username: e.target.value,
            error: ''}));
    };
    const handlePasswordChange = (e) => {
        setFormState(formState => ({...formState, 
            password: e.target.value,
            error: ''}));
    };

    const handleSubmit = (e) => {
        // dispatch action to login user (will set up `auth` state)
        e.preventDefault();
        if (!user) {
            setFormState(formState => ({...formState, 
                error: 'Username does not exist'}));
            return;
        }
        if (user.password !== formState.password) {
            setFormState(formState => ({...formState, 
                error: 'Incorrect password'}));
            return;
        }
        dispatch(loginUser(formState.username));
        navigate(location.state?.path || "/");
    };

    return <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    {
                        formState.error && <div className="alert alert-danger" role="alert">
                            {formState.error}
                        </div>
                    }
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-4">Login</h3>
                            {
                                formState.infoMessage && 
                                    <div className="alert alert-info">
                                        {formState.infoMessage}
                                    </div>
                            }
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input type="text" className="form-control" id="username" data-testid="username"
                                        placeholder="Enter username" onChange={handleUsernameChange} required
                                        autoComplete="on" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" data-testid="password"
                                        placeholder="Enter password" onChange={handlePasswordChange} required 
                                        autoComplete="on"  />
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
