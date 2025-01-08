import { selectAllQuestions } from "../features/questions/questionsSlice";
import { selectAuthedUserId } from "../features/auth/authSlice";
import { useSelector } from "react-redux";
import Question from "./Question";

const QuestionsList = () => {
    const questions = useSelector(selectAllQuestions);
    const username = useSelector(selectAuthedUserId);
        
    const unvotedQuestions = Object.keys(questions)
        .filter((id) => (
            questions[id].optionOne.votes.indexOf(username) === -1 && 
            questions[id].optionTwo.votes.indexOf(username) === -1));
        
    return (
        <div className="container">
            <div className="row g-4">
                {
                    unvotedQuestions.map((id) => (
                        <div key={id}>
                            <Question id={id} />
                        </div>
                ))}
            </div>
        </div>
    );
};

export default QuestionsList;
