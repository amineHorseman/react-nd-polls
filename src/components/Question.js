import { selectAuthedUserId } from "../features/auth/authSlice";
import { selectQuestion } from "../features/questions/questionsSlice";
import { selectUser } from "../features/users/usersSlice";
import { displayAvatar, displayElapsedTime } from "../utils/helpers";
import { useSelector } from "react-redux";

const Question = ({id, voted}) => {
    const question = useSelector(state => selectQuestion(state, id));
    const author = useSelector(state => selectUser(state, question.author));
    const authedUserId = useSelector(selectAuthedUserId);
    const authedUser = useSelector(state => selectUser(state, authedUserId));

    let userChoice = question.optionOne.text;
    let otherChoice = question.optionTwo.text;
    if (voted && authedUser["answers"][id] === 'optionTwo') {
        userChoice = question.optionTwo.text;
        otherChoice = question.optionOne.text;
    }
    
    return (
        <div className="card shadow-sm question">
            <div className="card-header bg-light">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        { displayAvatar(author["avatarURL"]) }
                        <span className="ms-2">{author["id"]}</span>
                    </div>
                    <small className="text-muted">
                        Asked { displayElapsedTime(question["timestamp"]) }
                    </small>
                </div>
            </div>
            <div className="card-body">
                <h5 className="card-title text-center mb-3">
                    { voted? 'You Would Rather' : 'Would You Rather'}
                </h5>
                {
                        voted ? (
                            <div className="d-grid col-6 gap-2 mx-auto">
                                <p className="btn btn-primary btn-static">{userChoice}</p>
                                <h5 className="mb-1">Than</h5>
                                <p className="btn btn-outline-danger btn-static">{otherChoice}</p>
                            </div>
                        ) : (
                            <div className="d-grid gap-2">
                                <button className="btn btn-outline-primary">{question.optionOne.text}</button>
                                <button className="btn btn-outline-primary">{question.optionTwo.text}</button>
                            </div>)
                }
            </div>
        </div>
    );
};

export default Question;
