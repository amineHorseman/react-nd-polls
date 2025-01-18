import '@testing-library/jest-dom';
import { loadInitialDataForTesting } from "../utils/testing_helpers";
import { wrapAndRenderComponent } from '../utils/testing_helpers';
import { loginUserForTesting } from "../utils/testing_helpers";
import Sidebar from "../components/Sidebar";

describe("Test for Sidebar component", () => {

    test("Component matches snapshot with user mtsamis", async () => {
        await loadInitialDataForTesting();
        await loginUserForTesting('mtsamis');
        const view = wrapAndRenderComponent(<Sidebar />);
        expect(view).toMatchSnapshot();
    });
});
