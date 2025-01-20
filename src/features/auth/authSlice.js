import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: null,
    status: '',
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
            state.status = 'You have been logged out.';
        },
        clearAuthStatus(state) {
            state.status = '';
        }
    },
});

export const selectAuthedUserId = (state) => state.auth.username;
export const selectAuthStatus = (state) => state.auth.status;

export const { loginUser, logoutUser, clearAuthStatus } = authSlice.actions;
export default authSlice.reducer;
