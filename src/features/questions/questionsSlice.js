import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { _getQuestions, 
         _saveQuestion,
         _deleteQuestion,
         _saveQuestionAnswer } from "../../utils/_DATA";

const initialState = {
    questions: {},
    status: 'idle',
    error: null,
};

export const fetchQuestions = createAsyncThunk(
    "questions/fetchQuestions",
    async () => {
        return await _getQuestions();
    }
)

export const addQuestion = createAsyncThunk(
    "questions/addQuestion",
    async (question) => {
        return await _saveQuestion(question);
    }
);

export const removeQuestion = createAsyncThunk(
    "questions/removeQuestion",
    async (id) => {
        return await _deleteQuestion(id);
    }
);

export const answerQuestion = createAsyncThunk(
    "questions/answerQuestion",
    async (voteDetails) => {
        return await _saveQuestionAnswer(voteDetails);
    }
);

const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        updateQuestionAnswers: (state, action) => {
            // optimistic update of the question's votes
            const { authedUser, qid, answer } = action.payload;
            state.questions[qid][answer].votes.push(authedUser);
        },
        revertQuestionAnswers: (state, action) => {
            // Cancel optimistic update of the question's votes
            const { authedUser, qid, answer } = action.payload;
            const votes = state.questions[qid][answer].votes;
            state.questions[qid][answer].votes = votes.filter(id => id !== authedUser);
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchQuestions.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchQuestions.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.questions = action.payload;
            })
            .addCase(fetchQuestions.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addQuestion.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addQuestion.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.questions[action.payload.id] = action.payload;
            })
            .addCase(addQuestion.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(removeQuestion.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(removeQuestion.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.questions = action.payload;
            })
            .addCase(removeQuestion.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(answerQuestion.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(answerQuestion.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(answerQuestion.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});

export const selectAllQuestions = (state) => state.questions.questions;
export const selectQuestion = (state, id) => selectAllQuestions(state)[id];
export const selectQuestionsError = (state) => state.questions.error;
export const { updateQuestionAnswers, revertQuestionAnswers } = questionsSlice.actions;
export default questionsSlice.reducer;
