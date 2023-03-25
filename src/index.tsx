import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Provider} from "react-redux";
import {store} from "./Store/Store";
import AppWithRedux from "./AppWithRedux";
import {ThemeProvider} from "@mui/material";
import {theme} from "./Utils/PalleteMUI";
import {BrowserRouter, HashRouter} from "react-router-dom";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <HashRouter>
                <AppWithRedux/>
            </HashRouter>
        </ThemeProvider>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

