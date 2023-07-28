import style from './Message.module.css';

export const Message = ({ message, handleChangeMessage }) => {
  // const handleClick = () => {
  //   handleChangeMessage('This message was sent from Message Component');
  // };

  const handleChange = (e) => {
    handleChangeMessage(e.target.value);
  };

  return (
    <div className={style.message}>
      {/* {messagesList} */}
      {/* {messagesList.map((el) => <p>{el}</p>)} */}
      <div>
        <p className="parent-message">{message}</p>
      </div>
      {/* <button onClick={handleClick}>Send Message</button> */}
      <h3 className={style.message_header}>Input message to Parent here:</h3>
      <input className={style.message_input} onChange={handleChange} />
    </div>
  );
};
