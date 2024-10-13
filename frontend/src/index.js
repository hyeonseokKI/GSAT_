import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
// import store from './Redux/Store.js'
import { PersistGate } from 'redux-persist/integration/react'; // PersistGate import
import store, { persistor } from './Redux/Store.js'; // 스토어와 persistor 임포트

import { initializeLoginState } from './Redux/Store';

store.dispatch(initializeLoginState());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>

        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>

    </Provider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
