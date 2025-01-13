import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { _getQuestions, _saveQuestion } from "../../utils/_DATA";

const initialState = {
    questions: {},
    status: 'idle',
    error: null,
};

export const fetchQuestions = createAsyncThunk(
    "questions/fetchQuestions",
    async () => {
        const response = await _getQuestions();
        return response;
    }
)

export const addQuestion = createAsyncThunk(
    "questions/addQuestion",
    async (question) => {
        const response = await _saveQuestion(question);
        return response;
    }
);

const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
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
            .addCase(addQuestion.pending, (state, action) => {
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
    },
});

export const selectAllQuestions = (state) => state.questions.questions;
export const selectQuestion = (state, id) => selectAllQuestions(state)[id];
export default questionsSlice.reducer;
