import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { selectAuthedUserId } from "../features/auth/authSlice";
import { addQuestion } from "../features/questions/questionsSlice";

const AddQuestion = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authedUserId = useSelector(selectAuthedUserId);
    const [optionOne, setOptionOne] = useState("");
    const [optionTwo, setOptionTwo] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const state = await dispatch(addQuestion({
            optionOneText: optionOne,
            optionTwoText: optionTwo,
            author: authedUserId
        }));
        state.error?  setError("Failed to save question! Please try again."):
            navigate("/");
        setIsSubmitting(false);
    };

    return (
        <div className="container py-4">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white">
                            <h4 className="mb-0">Create a new Poll</h4>
                        </div>
                        <div className="card-body">
                            {
                                error && <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            }
                            <h5 className="card-title text-center mb-4">Would You Rather...</h5>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <input type="text" className="form-control" placeholder="Enter first option"
                                        value={optionOne} onChange={(e) => setOptionOne(e.target.value)}  required />
                                </div>
                                <div className="mb-4">
                                    <input type="text" className="form-control" placeholder="Enter second option"
                                        value={optionTwo} onChange={(e) => setOptionTwo(e.target.value)} required />
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddQuestion;
