import { selectAllQuestions } from "../features/questions/questionsSlice";
import { selectAuthedUserId } from "../features/auth/authSlice";
import { selectUser } from "../features/users/usersSlice";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Question from "./Question";

const QuestionsList = () => {
    const questions = useSelector(selectAllQuestions);
    const username = useSelector(selectAuthedUserId);
    const user = useSelector(state => selectUser(state, username));
    const [votedFilter, setVotedFilter] = useState(false);
    const [displayedQuestions, setDisplayedQuestions] = useState([]);

    const votedQuestions = Object.keys(questions)
        .filter((id) => id in user.answers);
    const unvotedQuestions = Object.keys(questions)
        .filter((id) => !(id in user.answers));

    useEffect(() => {
        votedFilter ? setDisplayedQuestions(votedQuestions) :
            setDisplayedQuestions(unvotedQuestions)
    }, [votedFilter]);

    function toggleVoted(e) {
        setVotedFilter(e.target.checked);
    }

    return (
        <div className="container">
            <div className="d-flex justify-content-end gap-3 mb-3">
                <span className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch"
                        id="check-voted-filter" onChange={toggleVoted} checked={votedFilter} />
                    <label className="form-check-label" htmlFor="check-voted-filter">Show my past answers</label>
                </span>
            </div>
            <div className="row g-4">
                {
                    displayedQuestions.map((id) => (
                        <div key={id}>
                            <Question id={id} voted={votedFilter} />
                        </div>
                ))}
            </div>
        </div>
    );
};

export default QuestionsList;
