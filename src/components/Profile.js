import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { displayAlertDiv } from "../utils/helpers";
import { useAuthedUser } from '../hooks/useAuthedUser';
import { updateUser } from '../features/users/usersSlice';
import { handleFormChange, displayAvatar } from "../utils/helpers";

const Profile = () => {
    const dispatch = useDispatch();
    const user = useAuthedUser();
    const [formState, setFormState] = useState({
        name: user.name,
        password: '',
        avatarURL: user.avatarURL || '',
        error: '',
        success: '',
        isSubmitting: false
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormState(formState => ({...formState, 
            isSubmitting: true, 
            error: '', 
            success: '' 
        }));

        try {
            await dispatch(updateUser({...user,
                name: formState.name,
                password: formState.password || user.password,
                avatarURL: formState.avatarURL || null
            })).unwrap();

            setFormState(formState => ({...formState,
                isSubmitting: false,
                success: 'Profile updated successfully!',
                password: ''
            }));
        } catch (error) {
            setFormState(formState => ({...formState,
                isSubmitting: false,
                error: error.message
            }));
        }
    };

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    {displayAlertDiv(formState.error, "danger")}
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <h4 className="mb-0">Change profile information</h4>
                        </div>
                        <div className="card-title text-center mt-4">
                            {displayAvatar(user.avatarURL)}
                            <h5 className="mt-2">@{user.id}</h5>
                        </div>
                        <div className="card-body">
                            {displayAlertDiv(formState.success, "success")}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" id="name" className="form-control"
                                        value={formState.name} autoComplete="on" required
                                        onChange={(e) => handleFormChange(e, 'name', setFormState)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">New Password</label>
                                    <input type="password" id="password"  className="form-control"
                                        value={formState.password} autoComplete="on" 
                                        onChange={(e) => handleFormChange(e, 'password', setFormState)}
                                        placeholder="Leave empty to keep current password" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="avatar" className="form-label">Avatar URL</label>
                                    <input type="url" id="avatar" className="form-control"
                                        value={formState.avatarURL}
                                        onChange={(e) => handleFormChange(e, 'avatarURL', setFormState)}
                                        placeholder="https://example.com/avatar.jpg" />
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary" 
                                        data-testid="submit" disabled={formState.isSubmitting}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
