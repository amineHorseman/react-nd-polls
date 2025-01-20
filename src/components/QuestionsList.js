import { selectAllQuestions } from "../features/questions/questionsSlice";
import { useAuthedUser } from "../hooks/useAuthedUser";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useMemo } from "react";

import Question from "./Question";

const QuestionsList = () => {
    const questions = useSelector(selectAllQuestions);
    const authedUser = useAuthedUser();
    const [votedFilter, setVotedFilter] = useState(false);
    const [displayedQuestions, setDisplayedQuestions] = useState([]);

    // filter questions that have already been answered by the authed user
    const votedQuestions = useMemo(() =>
        Object.keys(questions)
                .filter((id) => id in authedUser.answers)
                .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
        [questions, authedUser.answers]
    );

    // filter questions that have not been answered yet by the authedUser
    const unvotedQuestions = useMemo(() => 
        Object.keys(questions)
            .filter((id) => !(id in authedUser.answers))
            .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
        [questions, authedUser.answers]
    );

    // change the list of filtered questions to display on screen when the
    // toggle button is switched on/off
    useEffect(() => {
        votedFilter ? setDisplayedQuestions(votedQuestions) :
            setDisplayedQuestions(unvotedQuestions)
    }, [votedFilter, votedQuestions, unvotedQuestions]);

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
                    displayedQuestions.length === 0 ? <p>Nothing to display!</p> : 
                        displayedQuestions.map((id) => (
                            <div key={id}>
                                <Question id={id} />
                            </div>
                ))}
            </div>
        </div>
    );
};

export default QuestionsList;
