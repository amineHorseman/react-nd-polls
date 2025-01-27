import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { _getUsers, _updateUser, _saveUser } from "../../utils/_DATA";

const initialState = {
    users: {},
    status: "idle",
    error: null,
}

export const fetchUsers = createAsyncThunk(
    "users/fetchUsers",
    async () => {
        const response = await _getUsers();
        return response;
    }
)

export const updateUser = createAsyncThunk(
    "users/updateUser",
    async (user) => {
        const response = await _updateUser(user);
        return response;
    }
)

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData) => {
        const response = await _saveUser(userData);
        return response;
    }
);

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        clearUsersError: (state) => { state.error = '' },
        updateUserAnswers: (state, action) => {
            // optimistic update of the user["answers"]
            const { authedUser, qid, answer } = action.payload;
            state.users[authedUser].answers[qid] = answer;
        },
        revertUserAnswers: (state, action) => {
            // Cancel optimistic update of the user["answers"]
            const { authedUser, qid } = action.payload;
            delete state.users[authedUser].answers[qid];
        },
        updateUserQuestions: (state, action) => {
            // optimistic update of the user["questions"] array
            const { authedUser, qid } = action.payload;
            state.users[authedUser].questions.push(qid);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users[action.payload.id] = action.payload;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users[action.payload.id] = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const selectAllUsers = (state) => state.users.users;
export const selectUser = (state, id) => selectAllUsers(state)[id];
export const selectUsersError = (state) => state.users.error;
export const { clearUsersError, 
               updateUserAnswers,
               revertUserAnswers,
               updateUserQuestions } = usersSlice.actions;
export default usersSlice.reducer;
