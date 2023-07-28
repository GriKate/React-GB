import { useParams } from 'react-router-dom';
// import { ChatMessageForm } from '../message/ChatMessageForm';
// import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { onValue } from 'firebase/database';
import { chatsRef, messagesRef } from '../../services/firebase';

// import { getMessages } from '../../redux/messagesReducer/selectors';

import TwoEntitiesView from '../UI/TwoEntitiesView';

export const ChatMessages = () => {
  // const messages = useSelector(getMessages)
  // const chats = useSelector((store) => store.chatsReducer)

  //для записи сообщений и чатов, полученных из БД firebase
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  // const [chat, setChat] = useState({});

  useEffect(() => {
    // читаем список чатов из БД firebase
    onValue(chatsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const dbChats = Object.entries(data).map((item) => ({
          dbID: item[0],
          ...item[1],
        }));
        // console.log(dbChats)
        // записываем чаты локально через useState, не в стор редакса
        setChats(dbChats);

        // const chat = chats.find((chat) => chat.id === chatID);
        // setChat(chat);
      }
    });
    // читаем список сообщений из БД firebase
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const mss = Object.entries(data).map((item) => ({
          dbID: item[0],
          ...item[1],
        }));
        setMessages(mss);
      }
    });
  }, []);

  const { chatID } = useParams();
  const currentChatMessages = messages.filter(
    (message) => message.chatId === chatID,
  );
  // console.log(currentChatMessages)

  return (
    <>
      {/* <h1>{chat.name}</h1> */}
      {currentChatMessages.map((el, idx) =>
        el ? (
          <TwoEntitiesView name={el.author} text={el.text} key={idx} />
        ) : null,
      )}
      {/* <ChatMessageForm messageAuthor={messageAuthor} 
                            setMessageAuthor={setMessageAuthor}
                            isMessageSent={isMessageSent}
                            messageText={messageText}
                            setMessageText={setMessageText}
                            handleAddMessage={handleAddMessage}/> */}
    </>
  );
};
