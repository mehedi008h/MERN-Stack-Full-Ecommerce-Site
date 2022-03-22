import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";

import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
    timeout: 5000,
    position: positions.BOTTOM_CENTER,
    transition: transitions.SCALE,
};

ReactDOM.render(
    <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...options}>
            <App />
        </AlertProvider>
    </Provider>,
    document.getElementById("root")
);

reportWebVitals();
