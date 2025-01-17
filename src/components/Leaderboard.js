import { selectAuthedUserId } from "../features/auth/authSlice";
import { selectAllUsers } from "../features/users/usersSlice";
import { useUsersRanking } from "../hooks/useUsersRanking";
import { useSelector } from "react-redux";

const Leaderboard = () => {
    const users = useSelector(selectAllUsers);
    const authedUserId = useSelector(selectAuthedUserId);
    const { scores, authedUserRank } = useUsersRanking(authedUserId);

    return (
        <div className="container mt-4 col-lg-10">
            <h2 className="mb-4">Leaderboard</h2>
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>Rank</th>
                            <th>User</th>
                            <th>Total Score</th>
                            <th>Questions</th>
                            <th>Answers</th>
                        </tr>
                    </thead>
                    <tbody>
                        { scores.map(({id, score}, index) => (
                            <tr key={id}
                                className={index === authedUserRank ? 'table-light' : ''}>
                                <td>{index + 1}</td>
                                <td>{users[id].name} <span className="text-muted">(@{id})</span></td>
                                <td><strong>{score}</strong></td>
                                <td>{users[id].questions.length}</td>
                                <td>{Object.keys(users[id].answers).length}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Leaderboard;
