import '@testing-library/jest-dom';
import { loadInitialDataForTesting } from "../utils/testing_helpers";
import { wrapAndRenderComponent } from '../utils/testing_helpers';
import { loginUserForTesting } from "../utils/testing_helpers";
import { screen, fireEvent, act, waitFor } from '@testing-library/react';
import QuestionsList from '../components/QuestionsList';

describe('Test for QuestionsList component', () => {
    test("Successfully display unvoted questions", async () => {
        await loadInitialDataForTesting();
        await loginUserForTesting('mtsamis');

        wrapAndRenderComponent(<QuestionsList />);

        const unvotedQuestion = screen.queryByText('Build our new application with Javascript');
        expect(unvotedQuestion).not.toBeNull();
        
        const votedQuestion = screen.queryByText('hire more frontend developers');
        expect(votedQuestion).toBeNull();
    });

    test("Successfully display voted questions when user clicks on the toggle button", async () => {
        await loadInitialDataForTesting();
        await loginUserForTesting('mtsamis');

        wrapAndRenderComponent(<QuestionsList />);

        expect(screen.getAllByText('Would You Rather...')).not.toBeNull();
        expect(screen.getByText('conduct a release retrospective 1 week after a release')).not.toBeNull();
        expect(screen.queryAllByText('I Would Rather').length).toEqual(0);
        expect(screen.queryByText('deploy to production once every two weeks')).toBeNull();

        fireEvent.click(screen.getByRole("switch"));

        expect(screen.getAllByText('I Would Rather')).not.toBeNull();
        expect(screen.getByText('deploy to production once every two weeks (67% votes)')).not.toBeNull();
        expect(screen.queryAllByText('Would You Rather...').length).toEqual(0);
        expect(screen.queryByText('conduct a release retrospective 1 week after a release')).toBeNull();
    });
});
