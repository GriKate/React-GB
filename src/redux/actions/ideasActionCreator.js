export const setIdea = (data) => {
  return {
    type: 'SET_IDEA',
    payload: data,
  };
};

export const getIdea = () => async (dispatch) => {
  // await fetch('https://bac')
  await fetch('https://baconipsum.com/api/?type=meat-and-filler')
    .then((res) => res.json())
    .then((data) => dispatch(setIdea(data[0])))
    .catch((err) => console.log(err));
};
