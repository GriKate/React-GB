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

const messages = [
    {author: 'Ann', text:'This message was sent from Ann'},
    {author: 'Nick', text:'This is an answer from Nick'}
  ]
// const messages = []
// console.log(typeof messages)

function addMessage(message) {
    messages.push(message)
}

// до 18 версии был метод рендер, теперь createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App messages={messages} addMessage={addMessage} />);

// root.render(element());

