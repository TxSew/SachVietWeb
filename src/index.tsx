import { CssBaseline, ThemeProvider } from '@mui/material';
import { inject } from '@vercel/analytics';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import App from './App';
import { Theme } from './Theme/Theme';
import { store } from './redux/storeClient';
import reportWebVitals from './reportWebVitals';
import GlobalStyle from './sass/GlobalStyle';

inject();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const LazyLoader = ({ children }: any) => <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
root.render(
    <React.StrictMode>
        <ThemeProvider theme={Theme}>
            <CssBaseline />
            <GlobalStyle>
                <Provider store={store}>
                    <ToastContainer />
                    <LazyLoader>
                        <App />
                    </LazyLoader>
                </Provider>
            </GlobalStyle>
        </ThemeProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
