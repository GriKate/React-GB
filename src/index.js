import React from 'react';
// /client подключается в 18 версии, до этого - только react-dom
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const messages = [
    {author: 'Ann', text:'This message was sent from Ann'},
    {author: 'Nick', text:'This is an answer from Nick'}
  ]

function addMessage(message) {
    messages.push(message)
}

// const chats = [
//   {id: '1', name: 'Weather'}, 
//   {id: '2', name: 'City'}, 
//   {id: '3', name: 'Transport'}
// ]

// до 18 версии был метод рендер, теперь createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App messages={messages} addMessage={addMessage} />);

// root.render(element());

