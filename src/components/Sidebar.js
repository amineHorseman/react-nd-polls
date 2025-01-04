import { selectUser } from "../features/users/usersSlice";
import { selectAuthedUserId } from "../features/auth/authSlice";
import { useSelector } from "react-redux";
import { FaCircleUser } from "react-icons/fa6";

const Sidebar = () => {
    const username = useSelector(selectAuthedUserId);
    const user = useSelector((state) => selectUser(state, username));

    return <div className="sidebar">
        <div className="card">
            <div className="card-body text-center">
                <div className="mb-2">
                    {
                        user["avatarURL"] === null ? <span ><FaCircleUser size="30" /></span> :
                            <img src={user["avatarURL"]} className="rounded-circle" 
                                alt="User avatar" width="30" height="30" />
                    }   
                </div>
                <h5 className="card-title mb-0">{username}</h5>
                <p className="card-text text-muted">{user["name"]}</p>
                <hr />
                <div className="row text-center">
                    <div className="col-6">
                        <h6 className="mb-0">{user["questions"].length}</h6>
                        <small className="text-muted">Questions</small>
                    </div>
                    <div className="col-6">
                        <h6 className="mb-0">{Object.keys(user["answers"]).length}</h6>
                        <small className="text-muted">Answers</small>
                    </div>
                </div>
            </div>
        </div>
    </div>;
};

export default Sidebar;