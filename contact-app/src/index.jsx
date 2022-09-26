import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

//import ContactReducer from './reducers/ContactReducer';

import { BrowserRouter as Router } from 'react-router-dom';
//import { createStoreHook, Provider } from 'react-redux';
//import { composeWithDevTools } from 'redux-devtools-extension';

import "bootstrap/dist/css/bootstrap.min.css"
import { Provider } from 'react-redux';
import { store } from './redux/store';


//const store = createStoreHook(ContactReducer, composeWithDevTools())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store = {store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
