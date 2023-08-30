import { initState } from '../initState';

// хранит текущее значение
export const ideaReducer = (state = initState, action) => {
  const { type, payload } = action;
  console.log(state);
  console.log(type);
  switch (type) {
    case 'SET_IDEA':
      return payload;
    case 'SHOW_NEW_IDEA':
      return state;
    default:
      return state;
  }
};
