import { Link, useParams } from "react-router-dom"

import {useEffect, useState} from 'react';
import '../.././index.css';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Navigate } from "react-router-dom";

const chats = [
    {
        id: '1',
        name: 'Weather', 
        messages: [
            {author: 'Ann', text:'This message was sent from Ann'},
            {author: 'Nick', text:'This is an answer from Nick'}
        ]}, 
    {
        id: '2',
        name: 'City', 
        messages: [
            {author: 'Sue', text:'Hello!'},
            {author: 'Luck', text:'Some answer'}
        ]}, 
    {
        id: '3',
        name: 'Transport', 
        messages: []}
]

export const Chats = () => {
    // разделить newMessage на 2 стейта: author и text. Массив при сете перетирается полностью
    const [messageAuthor, setMessageAuthor] = useState('')
    const [messageText, setMessageText] = useState('')
    const [isMessageSent, setMessageSent] = useState(false)

    // id чата берем из url
    const {chatID} = useParams()
    
    useEffect(() => {
        if(isMessageSent) {
            showBotMessage()
            setMessageSent(false)
            setMessageText('')
            setMessageAuthor('')
            document.getElementById('outlined-basic').focus();
        }
    })
    
    const showBotMessage = () => {
        if(messageAuthor) alert(messageAuthor + ", your message is published")
    }
    
    const handleAddMessage = (e) => {
        e.preventDefault()

        let inputMessage = {}
        if(messageText.length && messageAuthor.length) {
          inputMessage = {author: messageAuthor, text: messageText}
        } else {
            alert("Type the author and the text")
            return
        }
        
        chats.forEach((chat) => {
            if (chat.id===chatID) {
                chat.messages.push(inputMessage)
                 console.log(chat.messages)
            }
        })
    
        // изменяем стейт для перерендера через useEffect
        setMessageSent(true)

        // console.log(inputMessage)
    }


    return <>
        <h1>Chats</h1>
        <div className="wrapper">
        <div className="chat-list">
            <List>
                {chats.map((chat) => 
                chat ?
                <ListItem disablePadding key={chat.id}>
                    <ListItemButton>
                        <Link to={`${chat.id}`} key={chat.id} >{chat.name}</Link>
                    </ListItemButton>
                </ListItem> : null
                )}
            </List>
        </div>
        <div className="chat">
        {
            // ! если в URL передан несуществующий ID - "выберите чат"
            chatID ? (
                chats.map((chat, idx) => 
                    chatID && chatID===chat.id ?
                    <div key={chat.id}>
                        <Chat chat={chat} /> 
                        <form className="message-form">
                            <p style={{marginTop: '10px'}}>Send new message:</p>
                            <div className="message-form_container">
                            <TextField 
                                id="outlined-basic" 
                                label="Name" 
                                name="author"
                                value={messageAuthor  || ''} 
                                onChange={e => setMessageAuthor(e.target.value)}
                                variant="outlined" 
                                margin="normal" 
                                autoFocus={!isMessageSent}
                                />
                            <TextField
                                id="outlined-multiline-flexible"
                                margin="normal" 
                                label="Text"
                                name="text"
                                value={messageText  || ''}
                                onChange={e => setMessageText(e.target.value)}
                                />
                            <Button 
                                onClick={handleAddMessage} 
                                variant="contained" 
                                color="success"
                                >Send message</Button>
                            </div>
                        </form>
                    </div>
                    : null
                )
            ) : <h3>Choose the Chat</h3>
        }
        </div>
        </div>
    </>
}

export const Chat = ({chat}) => {
    return <>
        <h1>{chat.name}</h1>
        {chat.messages.map((el, idx) => 
            el ?
            <div key={idx}>
                <h3 key={el.author.idx}>{el.author}</h3>
                <p key={el.text.idx}>{el.text}</p>
            </div> 
            : null)
        }
    </>
}