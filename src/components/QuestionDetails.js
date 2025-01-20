import { selectQuestion } from "../features/questions/questionsSlice";
import { useAuthedUser } from "../hooks/useAuthedUser";
import { useParams, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Question from "./Question";

const QuestionDetails = () => {
    const navigate = useNavigate()
    const {id} = useParams();
    const question = useSelector(state => selectQuestion(state, id));

    // redirect to Error404 page if incorrect URL
    useEffect(() => {
        question == null && navigate("/Error404");
    }, [navigate, question]);

    // redirect to Home page when button is clicked
    const returnHome = (e) => {
        e.stopPropagation();
        navigate('/');
    };

    const authedUser = useAuthedUser();
    const voted = authedUser.answers[id];

    // display the Question component individually with the vote results 
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
