import { selectAllUsers } from "../features/users/usersSlice";
import { useSelector } from "react-redux";
import { useMemo } from "react";

export function useUsersRanking(authedUserId) {
    const users = useSelector(selectAllUsers);

    const { scores, authedUserRank } = useMemo(() => {
        const scores = Object.entries(users)
            .map(([id, user]) => ({
                id,
                score: user.questions.length + Object.keys(user.answers).length
            }))
            .sort((a, b) => b.score - a.score);
        const authedUserRank = scores.findIndex(({ id }) => id === authedUserId);
        return { scores, authedUserRank };
    }, [users, authedUserId]);

    return { scores, authedUserRank };
}