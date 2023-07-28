import { initState } from '../initState';

export const startupIdeasReducer = (state = initState, action) => {
  //eslint-disable-next-line
  const { type, payload } = action;
  switch (type) {
    case 'SHOW_NEW_IDEA':
      return state;
    default:
      return state;
  }
};
