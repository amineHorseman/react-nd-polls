import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useAuthedUser } from "../hooks/useAuthedUser";
import { updateUser } from "../features/users/usersSlice";
import { addQuestion, removeQuestion } from "../features/questions/questionsSlice";

const AddQuestion = ({setProgressBarValue}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authedUser = useAuthedUser();
    const [formState, setFormState] = useState({
        optionOne: "",
        optionTwo: "",
        error: "",
        isSubmitting: false,
    });

    const handleSubmit = async (e) => {
        // Record a new Poll and update user's state accordingly
        e.preventDefault();
        setFormState(formState => ({...formState, isSubmitting: true, error: ""}));
        try {
            checkIdenticalOptions();
            setProgressBarValue(20);

            const id = await saveQuestion(formState.optionOne, formState.optionTwo);
            setProgressBarValue(50);

            await updateUserQuestions(id);
            navigate("/");
        } catch (error) {
            setFormState(formState => ({...formState, 
                isSubmitting: false,
                error: error.message}));
        }
        setProgressBarValue(100);
    };

    const checkIdenticalOptions = () => {
        if (formState.optionOne === formState.optionTwo)
            throw new Error("Both options are identical! Please change one of them.");
    }

    const dispatchAddQuestion = async (optionOne, optionTwo) => {
        return await dispatch(addQuestion({
            optionOneText: optionOne,
            optionTwoText: optionTwo,
            author: authedUser.id
        }));
    };

    const dispatchRemoveQuestion = async (id) => {
        return await dispatch(removeQuestion(id));
    };

    const dispatchUpdateUser = async (updatedUser) => {
        return await dispatch(updateUser({
            ...updatedUser
        }));
    };

    const saveQuestion = async (optionOne, optionTwo) => {
        // dispatch action to add a new question to the `questions` state 
        const response = await dispatchAddQuestion(optionOne, optionTwo);
        if (response.error) {
            throw new Error(
                response.error.message === "Poll already exists" ?
                    "Poll already exists! Please change the question." :
                    "Failed to save question! Please try again."
            );
        }
        return response.payload.id;
    };

    const updateUserQuestions = async (questionId) => {
        // dispatch action to add the new question's id to the `users` state
        const updatedUser = {...authedUser,
            questions: [...authedUser.questions, questionId]
        };
        const response = await dispatchUpdateUser(updatedUser);
        if (response.error) {
            await dispatchRemoveQuestion(questionId);
            throw new Error("Failed to update user information! Please try again.");
        }
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
                                formState.error && <div className="alert alert-danger" role="alert">
                                    {formState.error}
                                </div>
                            }
                            <h5 className="card-title text-center mb-4">Would You Rather...</h5>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <input type="text" className="form-control" data-testid="optionOne"
                                        placeholder="Enter first option" value={formState.optionOne}
                                        onChange={(e) => setFormState(formState => ({...formState, optionOne:e.target.value}))}
                                        id="optionOne" required />
                                </div>
                                <div className="mb-4">
                                    <input type="text" className="form-control" data-testid="optionTwo"
                                        placeholder="Enter second option" value={formState.optionTwo}
                                        onChange={(e) => setFormState(formState => ({...formState, optionTwo:e.target.value}))}
                                        id="optionTwo" required />
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary" 
                                        data-testid="submit" disabled={formState.isSubmitting}>Submit</button>
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
