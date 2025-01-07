import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import { fetchQuestions } from '../features/questions/questionsSlice';
import { fetchUsers } from '../features/users/usersSlice';
import { loginUser } from '../features/auth/authSlice';
import QuestionsList from '../components/QuestionsList';
import store from '../app/store';

describe('Test for QuestionsList component', () => {
    test("Successfully display unvoted questions", async () => {
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <QuestionsList />
                </Provider>
            </BrowserRouter>
        );

        await store.dispatch(fetchUsers());
        await store.dispatch(fetchQuestions());
        await store.dispatch(loginUser('mtsamis'));

        const unvotedQuestion = await screen.findByText('Build our new application with Javascript');
        expect(unvotedQuestion).toBeVisible();
        
        const votedQuestion = await screen.findByText('hire more frontend developers');
        expect(votedQuestion).not.toBeVisible();
    });
});
