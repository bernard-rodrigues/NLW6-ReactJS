import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


import "./services/firebase";

//DOM: Document Object Model
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);