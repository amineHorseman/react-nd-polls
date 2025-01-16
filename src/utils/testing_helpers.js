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
