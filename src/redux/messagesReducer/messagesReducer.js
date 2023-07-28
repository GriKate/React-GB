import { initState } from '../initState';

export const messagesReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'DELETE_MESSAGE':
      return payload;
    // возвращаем новый массив объектов сообщений
    case 'ADD_NEW_MESSAGE':
      return [...state, payload];
    default:
      return state;
  }
};
