import '@testing-library/jest-dom';
import { loadInitialDataForTesting } from "../utils/testing_helpers";
import { wrapAndRenderComponent } from '../utils/testing_helpers';
import { loginUserForTesting } from "../utils/testing_helpers";
import Leaderboard from "../components/Leaderboard";

describe("Test for Leaderboard component", () => {

    test("Component matches snapshot with user mtsamis", async () => {
        await loadInitialDataForTesting();
        await loginUserForTesting('mtsamis');
        const view = wrapAndRenderComponent(<Leaderboard />);
        expect(view).toMatchSnapshot();
    });
});
