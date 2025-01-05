import { selectAllUsers } from "../features/users/usersSlice";
import { selectAuthedUserId } from "../features/auth/authSlice";
import { useSelector } from "react-redux";

const Leaderboard = () => {
    const users = useSelector(selectAllUsers);
    const authedUser = useSelector(selectAuthedUserId);

    // compute users scores and ranking
    let scores = Object.keys(users).map((id) => ({
        id: users[id].id,
        result: users[id].questions.length + Object.keys(users[id].answers).length
    }));    
    scores.sort((a, b) => (b.result - a.result));

    return (
        <div className="container mt-4 col-lg-9">
            <h2 className="mb-4">Leaderboard</h2>
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>Rank</th>
                            <th>User</th>
                            <th>Total Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scores.map((score, index) => (
                            <tr key={score.id}
                                className={score.id === authedUser ? 'table-light' : ''}>
                                <td>{index + 1}</td>
                                <td>{users[score.id].name} <span className="text-muted">(@{score.id})</span></td>
                                <td><strong>{score.result}</strong></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Leaderboard;
