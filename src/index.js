import React from 'react';
// /client подключается в 18 версии, до этого - только react-dom
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from 'react-redux'
import {store} from './redux/store'

// до 18 версии был метод рендер, теперь createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store} >
        <App />
    </Provider>
    );

// root.render(element());

