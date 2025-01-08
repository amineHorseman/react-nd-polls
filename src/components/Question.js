import { selectQuestion } from "../features/questions/questionsSlice";
import { selectUser } from "../features/users/usersSlice";
import { displayAvatar, displayElapsedTime } from "../utils/helpers";
import { useSelector } from "react-redux";

const Question = ({id}) => {
    const question = useSelector(state => selectQuestion(state, id));
    const author = useSelector(state => selectUser(state, question.author));

    return (
        <div className="card shadow-sm">
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
                <h5 className="card-title text-center mb-4">Would You Rather</h5>
                <div className="d-grid gap-2">
                    <button className="btn btn-outline-primary">{question.optionOne.text}</button>
                    <button className="btn btn-outline-primary">{question.optionTwo.text}</button>
                </div>
            </div>
        </div>
    );
};

export default Question;
