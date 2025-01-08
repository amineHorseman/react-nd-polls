import '@testing-library/jest-dom';
import { render, screen, act } from '@testing-library/react';
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

        await act(async () => {
            await store.dispatch(fetchUsers());
            await store.dispatch(fetchQuestions());
            await store.dispatch(loginUser('mtsamis'));
        });
      
        const unvotedQuestion = screen.queryByText('Build our new application with Javascript');
        expect(unvotedQuestion).not.toBeNull();
        
        const votedQuestion = screen.queryByText('hire more frontend developers');
        expect(votedQuestion).toBeNull();
    });
});
