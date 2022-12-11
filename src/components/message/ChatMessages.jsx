import { Link, useParams } from "react-router-dom"
import {ChatMessageForm} from '../message/ChatMessageForm'
import { useDispatch, useSelector } from 'react-redux'

import { getMessages } from '../../redux/messagesReducer/selectors'

import TwoEntitiesView from '../UI/TwoEntitiesView'

export const ChatMessages = ({messageAuthor, setMessageAuthor, isMessageSent,
    messageText,
    setMessageText,
    handleAddMessage}) => {
    const messages = useSelector(getMessages)
    
    const chats = useSelector((store) => store.chatsReducer)
    const {chatID} = useParams()
    const currentChatMessages = messages.filter((message) => message.chatId === chatID)
    const chat = chats.find((chat) => chat.id === chatID)

    return <>
        <h1>{chat.name}</h1>
        {currentChatMessages.map((el, idx) => 
            el ?
            <TwoEntitiesView name={el.author} text={el.text} key={idx} />
            : null)
        }
        {/* <ChatMessageForm messageAuthor={messageAuthor} 
                            setMessageAuthor={setMessageAuthor}
                            isMessageSent={isMessageSent}
                            messageText={messageText}
                            setMessageText={setMessageText}
                            handleAddMessage={handleAddMessage}/> */}
    </>
}