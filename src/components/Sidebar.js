import { useUsersRanking } from "../hooks/useUsersRanking";
import { useAuthedUser } from "../hooks/useAuthedUser";
import { displayAvatar } from "../utils/helpers";
import { Link } from "react-router";

const Sidebar = () => {
    const authedUser = useAuthedUser();
    const { scores , authedUserRank } = useUsersRanking(authedUser.id);

    // display the user's avatar, total score, and ranking
    return <div className="sidebar">
        <div className="card">
            <div className="card-body text-center">
                <div className="mb-2">
                    { displayAvatar(authedUser.avatarURL) }   
                </div>
                <h5 className="card-title mb-0">
                    <Link to="profile">{authedUser.id}</Link>
                </h5>
                <p className="card-text text-muted">{authedUser.name}</p>
                <hr />
                <div className="row text-center">
                    <div className="col-6">
                        <h6 className="mb-0">{scores[authedUserRank].score}</h6>
                        <small className="text-muted">Total Score</small>
                    </div>
                    <div className="col-6">
                        <h6 className="mb-0">{authedUserRank+1}</h6>
                        <small className="text-muted">Ranking</small>
                    </div>
                </div>
            </div>
        </div>
    </div>;
};

export default Sidebar;