import { useSelector } from "react-redux";
import { selectUser } from "../features/users/usersSlice";
import { selectAuthedUserId } from "../features/auth/authSlice";

export function useAuthedUser() {
    // Get user's object for the current authedUser
    const authedUserId = useSelector(selectAuthedUserId);
    const authedUser = useSelector(state => selectUser(state, authedUserId));
    return authedUser;
}