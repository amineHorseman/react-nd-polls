import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { _getUsers } from "../../utils/_DATA";

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

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
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
    },
});

export const selectAllUsers = (state) => state.users.users;
export const selectUser = (state, id) => selectAllUsers(state)[id];
export default usersSlice.reducer;
