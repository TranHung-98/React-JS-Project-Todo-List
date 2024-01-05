import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './views/App';
import reportWebVitals from './reportWebVitals';
import './style/global.scss'
import Modal from './components/modal';


const root = ReactDOM.createRoot(document.querySelector(".app#root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// const box = ReactDOM.createRoot(document.querySelector(".box-modal#box-modal"));
// box.render (
//   <React.StrictMode>
//     <Modal/>
//   </React.StrictMode>
// )

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
