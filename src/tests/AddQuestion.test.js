import store from '../app/store';
import '@testing-library/jest-dom';
import AddQuestion from '../components/AddQuestion';
import userEvent from '@testing-library/user-event';
import { screen, waitFor, act } from '@testing-library/react';
import { loadInitialDataForTesting, 
         loginUserForTesting, 
         wrapAndRenderComponent } from '../utils/testing_helpers';

jest.setTimeout(15000)

// Mock react-router navigation and loading bar function
jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useNavigate: () => jest.fn()
}));
const mockSetLoadingBarValue = jest.fn();

const fillFormAndSubmit = async (optionOneText, optionTwoText) => {
    // simulate user form submission
    const user = userEvent.setup();
    await user.type(screen.getByTestId("optionOne"), optionOneText);
    await user.type(screen.getByTestId("optionTwo"), optionTwoText);
    await user.click(screen.getByTestId("submit"));
    await new Promise((r) => setTimeout(r, 2000));
};

describe('Test for AddQuestion component', () => {
    beforeEach(async () => {
        await loadInitialDataForTesting();
        await loginUserForTesting('mtsamis');
    });

    test('Create new poll successfully', async () => {
        wrapAndRenderComponent(<AddQuestion setProgressBarValue={mockSetLoadingBarValue} />);
        const initialQuestionsCount = Object.keys(store.getState().questions.questions).length;

        const optionOneText = 'use React';
        const optionTwoText = 'use Vue';
        await act( async () => 
            await fillFormAndSubmit(optionOneText, optionTwoText)
        );

        await waitFor(() => {
            const finalQuestionsCount = Object.keys(store.getState().questions.questions).length;
            expect(finalQuestionsCount).toEqual(initialQuestionsCount + 1);
        });

        await waitFor(() => {
            expect(screen.queryByRole("alert")).toBeNull();
        });
    });

    test('Display error if new poll already exists', async () => {
        wrapAndRenderComponent(<AddQuestion setProgressBarValue={mockSetLoadingBarValue} />);
        const initialQuestionsCount = Object.keys(store.getState().questions.questions).length;

        const optionOneText = 'deploy to production once every two weeks';
        const optionTwoText = 'deploy to production once every month';
        await fillFormAndSubmit(optionOneText, optionTwoText)

        const finalQuestionsCount = Object.keys(store.getState().questions.questions).length;
        expect(finalQuestionsCount).toEqual(initialQuestionsCount);
        expect(screen.getByRole("alert")).not.toBeNull();
    });

});
    