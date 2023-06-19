import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
// import Home from "./music/Home";
import Home from './shoes/main/Home/Home';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import homeReducer from './shoes/main/Redux/Index';
const store = configureStore({
  reducer: {
    home: homeReducer,
  },
});
const rootElement = document.getElementById('root');
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Home />
      </Provider>
    </BrowserRouter>
    {/* <Home/> */}
  </React.StrictMode>,
  rootElement,
);
