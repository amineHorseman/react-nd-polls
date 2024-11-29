import { useLocation } from "react-router-dom";

const Login = (props) => {
    const location = useLocation();
    //TODO: redirect to location.state["path"] when logged in
    return <div>
        {
            location.state !== null && 
                <p>Please login to access this page.</p>
        }
        Login
    </div>;
};

export default Login;