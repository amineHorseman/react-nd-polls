import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { _getUsers, _updateUser } from "../../utils/_DATA";

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

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        updateUserAnswers: (state, action) => {
            // optimistic update of the user["answers"]
            const { authedUser, qid, answer } = action.payload;
            state.users[authedUser].answers[qid] = answer;
        },
        revertUserAnswers: (state, action) => {
            // Cancel optimistic update of the user["answers"]
            const { authedUser, qid } = action.payload;
            delete state.users[authedUser].answers[qid];
        }
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
            .addCase(updateUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users[action.payload.id] = action.payload;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    },
});

export const selectAllUsers = (state) => state.users.users;
export const selectUser = (state, id) => selectAllUsers(state)[id];
export const { updateUserAnswers, revertUserAnswers } = usersSlice.actions;
export default usersSlice.reducer;
