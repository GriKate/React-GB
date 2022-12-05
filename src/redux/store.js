import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './rootReducer';

import { initState } from './initState'

export const store = createStore(
    rootReducer,
    initState, 
    composeWithDevTools(applyMiddleware(thunk))
)