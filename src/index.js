import React from 'react';
// /client подключается в 18 версии, до этого - только react-dom
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// const span = React.createElement('span', {}, 'span')

// const element = React.createElement('h1', {
//   className: 'my-class'
// }, span)


// JSX - JS extension
// const element = () => {
//   return <div>my first elem</div>
// }



// до 18 версии был метод рендер, теперь createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// root.render(element());

