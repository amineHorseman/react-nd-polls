import { useAuthedUser } from "../hooks/useAuthedUser";
import { displayAvatar } from "../utils/helpers";

const Sidebar = () => {
    const authedUser = useAuthedUser();

    return <div className="sidebar">
        <div className="card">
            <div className="card-body text-center">
                <div className="mb-2">
                    { displayAvatar(authedUser.avatarURL) }   
                </div>
                <h5 className="card-title mb-0">{authedUser.id}</h5>
                <p className="card-text text-muted">{authedUser.name}</p>
                <hr />
                <div className="row text-center">
                    <div className="col-6">
                        <h6 className="mb-0">{authedUser.questions.length}</h6>
                        <small className="text-muted">Questions</small>
                    </div>
                    <div className="col-6">
                        <h6 className="mb-0">{Object.keys(authedUser.answers).length}</h6>
                        <small className="text-muted">Answers</small>
                    </div>
                </div>
            </div>
        </div>
    </div>;
};

export default Sidebar;