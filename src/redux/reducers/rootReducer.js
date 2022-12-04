import { combineReducers } from 'redux';
import { postsReducer } from './postsReducer';
import { inputPostReducer } from './inputPostReducer';
import { profilesReducer } from './profilesReducer';
import { inputProfileReducer } from './inputProfileReducer'
import { chatsReducer } from './chatsReducer'
import { inputChatReducer } from './inputChatReducer'

export const rootReducer = combineReducers({
    postsReducer: postsReducer,
    inputPostReducer: inputPostReducer, 
    profilesReducer: profilesReducer, 
    inputProfileReducer: inputProfileReducer,
    chatsReducer: chatsReducer, 
    inputChatReducer: inputChatReducer
})