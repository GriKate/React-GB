import { initState } from '../initState';

export const inputProfileReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'PROFILE_INPUT':
      return { ...state, ...payload };
    case 'PROFILE_INPUT_CLEAR':
      return { ...payload };
    default:
      return state;
  }
};
