import { useLocation } from "react-router-dom";

const Login = (props) => {
    const location = useLocation();

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
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input type="text" className="form-control" id="username" 
                                        placeholder="Enter username" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password"
                                        placeholder="Enter password" required />
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
