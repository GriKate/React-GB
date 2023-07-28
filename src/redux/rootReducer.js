import { combineReducers } from 'redux';
import { postsReducer } from './postsReducers/postsReducer';
import { inputPostReducer } from './postsReducers/inputPostReducer';
import { profilesReducer } from './profilesReducers/profilesReducer';
import { inputProfileReducer } from './profilesReducers/inputProfileReducer';
import { chatsReducer } from './chatsReducers/chatsReducer';
import { inputChatReducer } from './chatsReducers/inputChatReducer';
import { inputMessageReducer } from './messagesReducer/inputMessageReducer';
import { messagesReducer } from './messagesReducer/messagesReducer';
import { startupIdeasReducer } from './ideasReducers/startupIdeasReducer';
import { ideaReducer } from './ideasReducers/ideaReducer';

export const rootReducer = combineReducers({
  postsReducer: postsReducer,
  inputPostReducer: inputPostReducer,
  profilesReducer: profilesReducer,
  inputProfileReducer: inputProfileReducer,
  chatsReducer: chatsReducer,
  inputChatReducer: inputChatReducer,
  inputMessageReducer: inputMessageReducer,
  messagesReducer: messagesReducer,
  startupIdeasReducer: startupIdeasReducer,
  ideaReducer: ideaReducer,
});
