import { initState } from '../initState';

export const inputPostReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case '':
      return { ...state, ...payload };
    default:
      return state;
  }
};
