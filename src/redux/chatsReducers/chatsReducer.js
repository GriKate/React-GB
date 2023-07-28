import { initState } from '../initState';

export const chatsReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'DELETE_CHAT':
      return payload;
    // возвращаем новый массив объектов с чатами
    case 'ADD_NEW_CHAT':
      return [...state, payload];
    default:
      return state;
  }
};
