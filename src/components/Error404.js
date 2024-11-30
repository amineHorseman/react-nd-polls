import { Link } from "react-router-dom";

const Error404 = (props) => {
    return <div className="center">
        <h1>Error 404</h1>
        <p>The page you're looking for does not exist.</p>
        <Link to="/">Return to homepage</Link>
    </div>;
};

export default Error404;
