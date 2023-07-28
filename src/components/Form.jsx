export const Form = () => {
  const count = 1;
  const name = 'gb';
  return (
    <form>
      <p>Count: {count}</p>
      <p>Name: {name}</p>
      <input type="text"></input>
      <button type="button">btn</button>
    </form>
  );
};
