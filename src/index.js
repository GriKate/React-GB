import React from 'react';
// /client подключается в 18 версии, до этого - только react-dom
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from 'react-redux'
import {store, persistor} from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'

// до 18 версии был метод рендер, теперь createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store} >
        <PersistGate persistor={persistor} >
            <App />
        </PersistGate>
    </Provider>
    );

// root.render(element());

