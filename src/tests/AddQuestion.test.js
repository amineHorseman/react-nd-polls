import store from '../app/store';
import '@testing-library/jest-dom';
import AddQuestion from '../components/AddQuestion';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import { loadInitialDataForTesting, 
         loginUserForTesting, 
         wrapAndRenderComponent } from '../utils/testing_helpers';

const fillFormAndSubmit = async (optionOneText, optionTwoText) => {
    const user = userEvent.setup();
    await user.type(screen.getByTestId("optionOne"), optionOneText);
    await user.type(screen.getByTestId("optionTwo"), optionTwoText);
    await user.click(screen.getByTestId("submit"));
};

const mockSetLoadingBarValue = (x) => { return; }

describe('Test for AddQuestion component', () => {

    test('Create new poll successfully', async () => {
        await loadInitialDataForTesting();
        await loginUserForTesting('mtsamis');
        wrapAndRenderComponent(<AddQuestion setProgressBarValue={mockSetLoadingBarValue} />);
        const questionsCount = Object.keys(store.getState().questions.questions).length;

        const optionOneText = 'use React';
        const optionTwoText = 'use Vue';

        await fillFormAndSubmit(optionOneText, optionTwoText);

        await waitFor(() => {
            const errorMessage = screen.queryByRole("alert");
            expect(errorMessage).toBeNull();
        });
        await waitFor(() => {
            const errorMessage = screen.queryByText("use React");
            expect(errorMessage).toBeDefined();
        });
        await waitFor(() => {
            expect(Object.keys(store.getState().questions.questions).length).toEqual(questionsCount+1);
        });
    });

    test('Display error if new poll already exists', async () => {
        await loadInitialDataForTesting();
        await loginUserForTesting('mtsamis');
        wrapAndRenderComponent(<AddQuestion setProgressBarValue={mockSetLoadingBarValue} />);
        const questionsCount = Object.keys(store.getState().questions.questions).length;

        const optionOneText = 'deploy to production once every two weeks';
        const optionTwoText = 'deploy to production once every month';

        await fillFormAndSubmit(optionOneText, optionTwoText);

        await waitFor(() => {
            const errorMessage = screen.queryByText("Poll already exists! Please change the question");
            expect(errorMessage).toBeDefined();
        });
        await waitFor(() => {
            const errorMessage = screen.queryByText("use React");
            expect(errorMessage).toBeDefined();
        });
        await waitFor(() => {
            expect(Object.keys(store.getState().questions.questions).length).toEqual(questionsCount);
        });
    });

});
    