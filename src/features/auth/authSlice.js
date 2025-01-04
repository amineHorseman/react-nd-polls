import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: null,
    status: 'idle',
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginUser(state, action) {
            state.username = action.payload;
        },
        logoutUser(state) {
            state.username = null;
        }
    },
});

export const selectAuthedUserId = (state) => state.auth.username;

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
