import { useNavigate } from "react-router";
import { useAuthedUser } from "../hooks/useAuthedUser";
import { useDispatch, useSelector } from "react-redux";
import { displayAvatar, displayElapsedTime } from "../utils/helpers";
import { revertUserAnswers, selectUser, updateUserAnswers } from "../features/users/usersSlice";
import { answerQuestion, 
         selectQuestion,
         updateQuestionAnswers,
         revertQuestionAnswers } from "../features/questions/questionsSlice";

const Question = ({id, showDetails}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const question = useSelector(state => selectQuestion(state, id));
    const author = useSelector(state => selectUser(state, question.author));
    const authedUser = useAuthedUser();
    const voted = authedUser.answers[id];

    // Compute the number of votes and percentage for each option.
    // The authed user's voted option is stored in `userChoice` variable.
    let userChoice = question.optionOne.text;
    let otherChoice = question.optionTwo.text;
    let votes = [question.optionOne.votes, question.optionTwo.votes];
    if (voted && authedUser.answers[id] === 'optionTwo') {
        userChoice = question.optionTwo.text;
        otherChoice = question.optionOne.text;
        votes.reverse();
    }
    const votesCount = votes[0].length + votes[1].length;
    const percentage = Math.round(votes[0].length * 100 / votesCount);

    // display the poll individually on a separate page when the user
    // clicks on the question's item
    const handleClick = () => navigate(`/questions/${id}`);

    const handleAnswer = async (e) => {
        // Record the user's voted option by dispatching the answerQuestion action.
        // Optimistic updates are applied, then reverted if something wrong happens.
        e.preventDefault();
        e.stopPropagation();
        const voteDetails = {
            authedUser: authedUser.id,
            qid: id,
            answer: e.target.name
        };
        dispatch(updateUserAnswers(voteDetails)); // optimistic update
        dispatch(updateQuestionAnswers(voteDetails)); // optimistic update
        const response = await dispatch(answerQuestion(voteDetails));
        navigate(`/questions/${id}`);
        if (response.error) {
            dispatch(revertUserAnswers(voteDetails));
            dispatch(revertQuestionAnswers(voteDetails));
        }
    };

    const showUsersList = (users, title) => {
        // Dispaly users list from an array of usernames (used to show results)
        return (
            <p>
                {title} ({users.length} {users.length === 1 ? "user" : "users"}): <br />
                {users.map((username) => <span key={username}>{username}<br /></span>)}
            </p>
        );
    }

    const showResults = () => {
        // Show users list for each option
        return (
            <div className="row mt-3 small">
                <p className="col-12">Total: {votesCount} votes</p>
                <div className="col-6">
                {showUsersList(votes[0], "The following users voted for the first option")}
                </div>
                <div className="col-6">
                {showUsersList(votes[1], "The following users voted for the other option")}
                </div>
            </div>
        );
    }

    return (
        {question} && <div className="card shadow-sm question" onClick={handleClick}>
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
                    { voted? 'I Would Rather' : 'Would You Rather...'}
                </h5>
                { 
                    voted ? (   // Display voted option and vote results
                            <div className="d-grid col-12 mx-auto">
                                <div className="row col-8 mx-auto">
                                    <p className="btn btn-primary btn-static">{userChoice} ({percentage}% votes)</p>
                                    <h5 className="mb-1">Than</h5>
                                    <p className="btn btn-outline-danger btn-static ">{otherChoice} ({100-percentage}% votes)</p>
                                    {!showDetails && <small className="col-12 text-muted mt-2">Total: {votesCount} votes</small>}
                                </div>
                                { showDetails && showResults() }
                            </div>
                        ) : (   // Display clickable buttons to vote on each option
                            <div className="d-grid gap-2">
                                <button className="btn btn-outline-primary" name="optionOne" 
                                    onClick={(e)=>{handleAnswer(e)}}>{question.optionOne.text}</button>
                                <button className="btn btn-outline-primary" name="optionTwo" 
                                    onClick={(e)=>{handleAnswer(e)}}>{question.optionTwo.text}</button>
                            </div>)
                }
            </div>
        </div>
    );
};

export default Question;
