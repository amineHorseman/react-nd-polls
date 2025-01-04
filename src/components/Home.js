import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Home = () => {
    return <div className="home-container">
        <Sidebar />
        <main className="main-content">
            <Outlet />
        </main>
    </div>;
};

export default Home;
