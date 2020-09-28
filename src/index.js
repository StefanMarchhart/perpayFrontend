import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './components/app/App';
import * as serviceWorker from './serviceWorker';
import Mainpage from './components/mainpage/mainpage'
import SignIn from "./components/login/login"
import '../public/favicon.ico';
ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
  {/* <SignIn></SignIn> */}
    <Mainpage></Mainpage>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
