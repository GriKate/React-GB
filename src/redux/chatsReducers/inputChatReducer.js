import { initState } from '../initState';

// хранит текущее значение формы ввода имени чата
export const inputChatReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_CHAT_INPUT':
      return { ...state, ...payload };
    case 'CHAT_INPUT_CLEAR':
      return { ...payload };
    default:
      return state;
  }
};
