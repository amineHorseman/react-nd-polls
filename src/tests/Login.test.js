import '@testing-library/jest-dom';
import { wrapAndRenderComponent } from '../utils/testing_helpers';
import { screen, fireEvent } from '@testing-library/react';
import { fetchUsers } from '../features/users/usersSlice';
import Login from '../components/Login';
import store from '../app/store';

const fillFormAndSubmit = (testUsername, testPassword) => {
    const usernameInput = screen.getByTestId("username");
    const passwordInput = screen.getByTestId("password");
    const submitButton = screen.getByTestId("submit");
    fireEvent.change(usernameInput, { target: { value: testUsername }});
    fireEvent.change(passwordInput, { target: { value: testPassword }});
    fireEvent.click(submitButton);
};

describe('Test for Login component', () => {

    test('Display username does not exist error', async () => {
        wrapAndRenderComponent(<Login />);

        await store.dispatch(fetchUsers());
        
        const testUsername = 'invalid_username';
        const testPassword = 'invalid_password';
        fillFormAndSubmit(testUsername, testPassword);
    
        const errorMessage = screen.getByRole("alert");
        expect(errorMessage.innerHTML).toMatch("Username does not exist");
    });
    
    test('Display incorrect password error', async () => {
        wrapAndRenderComponent(<Login />);
        
        await store.dispatch(fetchUsers());

        const testUsername = 'mtsamis';
        const testPassword = 'invalid_password';
        fillFormAndSubmit(testUsername, testPassword);
    
        const errorMessage = screen.getByRole("alert");
        expect(errorMessage.innerHTML).toMatch("Incorrect password");
    });
    
    test('Login successfully', async () => {
        wrapAndRenderComponent(<Login />);

        await store.dispatch(fetchUsers());

        const testUsername = 'mtsamis';
        const testPassword = 'xyz123';
        fillFormAndSubmit(testUsername, testPassword);
    
        const errorMessage = screen.queryByRole("alert");
        expect(errorMessage).toBeNull();
        expect(store.getState().auth.username).toBe(testUsername);
    });
});
