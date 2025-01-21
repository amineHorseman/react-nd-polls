import store from '../app/store';
import '@testing-library/jest-dom';
import Register from '../components/Register';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import { wrapAndRenderComponent } from '../utils/testing_helpers';

const fillFormAndSubmit = async (testUsername, testFullname, testPassword) => {
    const user = userEvent.setup();
    await user.type(screen.getByTestId("username"), testUsername);
    await user.type(screen.getByTestId("name"), testFullname);
    await user.type(screen.getByTestId("password"), testPassword);
    await user.click(screen.getByTestId("submit"));
};

describe('Test for Register component', () => {

    test('Register successfully', async () => {
        wrapAndRenderComponent(<Register />);

        const testUsername = 'j0hn';
        const testFullname = 'John Stevens';
        const testPassword = 'xyz987';

        await fillFormAndSubmit(testUsername, testFullname, testPassword);

        await waitFor(() => {
            const errorMessage = screen.queryByRole("alert");
            expect(errorMessage).toBeNull();
        });
        await waitFor(() => {
            expect(store.getState().users.users[testUsername]).toBeDefined();
        });
        await waitFor(() => {
            expect(store.getState().auth.username).toEqual(testUsername);
        });
    });

    test('Returns error if user already exists', async () => {
        wrapAndRenderComponent(<Register />);

        const testUsername = 'mtsamis';
        const testFullname = 'Mike Tsamis';
        const testPassword = 'xyz123';

        await fillFormAndSubmit(testUsername, testFullname, testPassword);

        await waitFor(() => {
            const errorMessage = screen.queryByText("Username already exists");
            expect(errorMessage).not.toBeNull();
        });
        await waitFor(() => {
            expect(store.getState().users.users[testUsername]).not.toBeDefined();
        });
        await waitFor(() => {
            expect(store.getState().auth.username).not.toBe(testUsername);
        });
    });

});
    