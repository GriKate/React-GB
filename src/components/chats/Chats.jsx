import { Link, useParams } from "react-router-dom"

import {useEffect, useState} from 'react';
import '../.././index.css';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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
    const [chatName, setChatName] = useState('')

    // modal window
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

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

    const deleteChat = (id) => {
        console.log(id)
        chats.filter((chat) => chat.id !== id)
    }

    const handleAddChat = () => {
        console.log(chatName)
    }

    return <>
        <div style={{display: "flex", alignItems: "center"}}>
            <h1 style={{marginRight: "30px"}}>Chats</h1>
            <Button variant="outlined" onClick={handleOpen}>Add New Chat</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <div className="message-form_container">
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                        Enter chat Name
                        </Typography>
                        <TextField
                            id="outlined-multiline-flexible"
                            margin="normal" 
                            name="chatName"
                            value={chatName  || ''}
                            onChange={e => setChatName(e.target.value)}
                            />
                        <Button 
                            onClick={handleAddChat} 
                            variant="contained" 
                            color="success"
                            >Add Chat
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
        <div className="wrapper">
        <div className="chat-list">
            <MenuList>
                {chats.map((chat) => 
                chat ?
                <MenuItem key={chat.id}>
                    <ListItemText>
                        <Link to={`${chat.id}`} >{chat.name}</Link>
                    </ListItemText>
                    <ListItemIcon>
                        <Button variant="contained" color="error" onClick={() => {deleteChat(chat.id)}}>X</Button>
                    </ListItemIcon>
                </MenuItem> : null
                )}
            </MenuList>
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