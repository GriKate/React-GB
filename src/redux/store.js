import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './reducers/rootReducer';

import { initState } from './initState'

export const store = createStore(
    rootReducer,
    initState, 
    composeWithDevTools()
)