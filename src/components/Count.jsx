import { useState } from 'react';

export const Count = () => {
  const [count, setCount] = useState(1);

  const handleClick = () => {
    setCount(count + 1);
  };
  return (
    <>
      <p>Count state: {count}</p>
      <button type="button" onClick={handleClick}>
        btn
      </button>
    </>
  );
};
