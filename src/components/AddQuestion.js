import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useAuthedUser } from "../hooks/useAuthedUser";
import { updateUser } from "../features/users/usersSlice";
import { addQuestion, removeQuestion } from "../features/questions/questionsSlice";

const AddQuestion = () => {
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
        e.preventDefault();
        setFormState(formState => ({...formState, isSubmitting: true}));
        const addQuestionResponse = await addQuestionRequest(formState.optionOne, formState.optionTwo);
        if (addQuestionResponse.error)
            setFormState(formState => ({...formState,
                isSubmitting: false,
                error: "Failed to save question! Please try again."}));
        else {
            const updatedUser = addUserQuestion(addQuestionResponse.payload.id)
            const updateUserResponse = await updateUserRequest(updatedUser);
            if (updateUserResponse.error) {
                setFormState(formState => ({...formState,
                    isSubmitting: false,
                    error: "Failed to update user information! Please try again."}));
                await removeQuestionRequest(addQuestionResponse.payload.id);
            }
            else
                navigate("/");
        }
    };

    const addQuestionRequest = async (optionOne, optionTwo) => {
        return await dispatch(addQuestion({
            optionOneText: optionOne,
            optionTwoText: optionTwo,
            author: authedUser.id
        }));
    };

    const removeQuestionRequest = async (id) => {
        return await dispatch(removeQuestion(id));
    };

    const updateUserRequest = async (updatedUser) => {
        return await dispatch(updateUser({
            ...updatedUser
        }));
    };

    const addUserQuestion = (questionId) => {
        return {
            ...authedUser,
            questions: [...authedUser.questions, questionId]
        };
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
                                        required />
                                </div>
                                <div className="mb-4">
                                    <input type="text" className="form-control" data-testid="optionTwo"
                                        placeholder="Enter second option" value={formState.optionTwo}
                                        onChange={(e) => setFormState(formState => ({...formState, optionTwo:e.target.value}))}
                                        required />
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
