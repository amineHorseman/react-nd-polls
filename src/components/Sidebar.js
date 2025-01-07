import { selectUser } from "../features/users/usersSlice";
import { selectAuthedUserId } from "../features/auth/authSlice";
import { useSelector } from "react-redux";
import { displayUserAvatar } from "../utils/helpers";

const Sidebar = () => {
    const username = useSelector(selectAuthedUserId);
    const user = useSelector((state) => selectUser(state, username));

    return <div className="sidebar">
        <div className="card">
            <div className="card-body text-center">
                <div className="mb-2">
                    { displayUserAvatar(user["avatarURL"]) }   
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