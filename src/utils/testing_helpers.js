import { fetchQuestions } from "../features/questions/questionsSlice";
import { fetchUsers } from "../features/users/usersSlice";
import { loginUser } from "../features/auth/authSlice";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import store from '../app/store';

export function wrapAndRenderComponent(component) {
    return render(
        <BrowserRouter>
            <Provider store={store}>
                {component}
            </Provider>
        </BrowserRouter>
    );
}

export async function loadInitialDataForTesting() {
    await store.dispatch(fetchUsers());
    await store.dispatch(fetchQuestions());
}

export async function loginUserForTesting(username) {
    await store.dispatch(loginUser(username));
}
