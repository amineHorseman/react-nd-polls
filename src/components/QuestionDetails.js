import { selectQuestion } from "../features/questions/questionsSlice";
import { selectAuthedUserId } from "../features/auth/authSlice";
import { useParams, useNavigate } from "react-router";
import { selectUser } from "../features/users/usersSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Question from "./Question";

const QuestionDetails = () => {
    const navigate = useNavigate()
    const {id} = useParams();
    const question = useSelector(state => selectQuestion(state, id));

    useEffect(() => {
        question == null && navigate("/");
    }, [navigate, question]);

    const returnHome = (e) => {
        e.stopPropagation();
        navigate('/');
    };

    const authedUserId = useSelector(selectAuthedUserId);
    const authedUser = useSelector(state => selectUser(state, authedUserId));
    const voted = authedUser["answers"][id];

    return (
        <div className="container">
            {question && <Question id={id} showDetails={true} />}
            <div className="mt-5">
                { 
                    !voted && (
                        <div className="row g-4">
                            <p>Vote results are hidden. Please answer the poll first to see the details.</p>
                        </div>)
                }
            </div>
            <div>
                <a href="#!" onClick={returnHome}>Return to homepage</a>
            </div>
        </div>
    );
};
    
export default QuestionDetails;
