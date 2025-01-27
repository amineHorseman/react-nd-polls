import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { displayAlertDiv } from "../utils/helpers";
import { handleFormChange } from '../utils/helpers';
import { loginUser } from '../features/auth/authSlice';
import { registerUser } from '../features/users/usersSlice';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formState, setFormState] = useState({
        username: '',
        password: '',
        name: '',
        error: ''
    });

    const handleSubmit = async (e) => {
        // dispatch action to regiser user
        e.preventDefault();
        if (!formState.username || !formState.password || !formState.name) {
            setFormState(prev => ({...prev, error: 'All fields are required'}));
            return;
        }

        try {
            await dispatch(registerUser({
                id: formState.username,
                password: formState.password,
                name: formState.name
            })).unwrap();
            await dispatch(loginUser(formState.username))
            navigate('/');
        } catch (error) {
            setFormState(prev => ({...prev, error: error.message}));
        }
    };

    return <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    {displayAlertDiv(formState.error, "danger")}
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-4">Create a new account</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input type="text" className="form-control" id="username" data-testid="username"
                                        placeholder="Enter username" value={formState.username}
                                        onChange={(e) => handleFormChange(e, 'username', setFormState)} 
                                        autoComplete="on" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Full name</label>
                                    <input type="text" className="form-control" id="name" data-testid="name" 
                                        placeholder="Enter name" value={formState.name}
                                        onChange={(e) => handleFormChange(e, 'name', setFormState)} 
                                        autoComplete="on" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" data-testid="password"
                                        placeholder="Enter password" value={formState.password}
                                        onChange={(e) => handleFormChange(e, 'password', setFormState)} 
                                        autoComplete="on" required />
                                </div>
                                <button type="submit" className="btn btn-primary w-100" data-testid="submit">Register</button> 
                                <div className="mt-3 mb-3">
                                    <Link to="/login">Return to Login page</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
};

export default Register;
