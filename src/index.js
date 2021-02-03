import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import '../node_modules/materialize-css/dist/css/materialize.min.css';
import '../node_modules/materialize-css/dist/js/materialize.min';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);


