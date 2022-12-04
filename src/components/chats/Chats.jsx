import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'

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

// const chats = [
//     {
//         id: '1',
//         name: 'Weather', 
//         messages: [
//             {author: 'Ann', text:'This message was sent from Ann'},
//             {author: 'Nick', text:'This is an answer from Nick'}
//         ]}, 
//     {
//         id: '2',
//         name: 'City', 
//         messages: [
//             {author: 'Sue', text:'Hello!'},
//             {author: 'Luck', text:'Some answer'}
//         ]}, 
//     {
//         id: '3',
//         name: 'Transport', 
//         messages: []}
// ]

export const Chats = () => {
    // разделить newMessage на 2 стейта: author и text. Массив при сете перетирается полностью
    const [messageAuthor, setMessageAuthor] = useState('')
    const [messageText, setMessageText] = useState('')
    const [isMessageSent, setMessageSent] = useState(false)
    const dispatch = useDispatch()
    const chatInput = useSelector((store) => store.inputChatReducer)
    const chats = useSelector((store) => store.chatsReducer)

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
        // console.log(id)
        dispatch({
            type: 'DELETE_CHAT', 
            payload: chats.filter((chat) => chat.id !== id)
          })
    }

    const setChatInput = (e) => {
        dispatch({
          type: 'SET_CHAT_INPUT', 
          payload: {[e.target.name]: e.target.value}
        })
      }

    const submitChat = (e) => {
        e.preventDefault()
        // console.log(chatInput)
        chatInput.id = String(Math.floor(Math.random() * 1000))
        chatInput.messages = [
                        {author: 'Sue', text:'Hello!'},
                        {author: 'Luck', text:'Some answer'}
                    ]
        dispatch({
            type: 'ADD_NEW_CHAT',
            payload: chatInput
        })
        dispatch({
            type: 'CHAT_INPUT_CLEAR', 
            payload: {name: ''}
          })
        // console.log(chatInput)
        handleClose()
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
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    Enter chat Name
                    </Typography>
                    <form>
                        <div className="message-form_container">
                            <TextField
                                id="outlined-multiline-flexible"
                                margin="normal" 
                                name="name"
                                value={chatInput.name}
                                onChange={setChatInput}
                                />
                            <Button 
                                onClick={submitChat} 
                                variant="contained" 
                                color="success"
                                >Add Chat
                            </Button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
        <div className="wrapper">
        <div className="chat-list">
            <MenuList>
                {chats.map((chat) => 
                chat ?
                <MenuItem key={chat.id}>
                    <ListItemButton>
                        <ListItemText>
                            <Link to={`${chat.id}`} >{chat.name}</Link>
                        </ListItemText>
                        <ListItemIcon>
                            <Button variant="contained" color="error" onClick={() => {deleteChat(chat.id)}}>X</Button>
                        </ListItemIcon>
                    </ListItemButton>
                </MenuItem> : null
                )}
            </MenuList>
        </div>
        <div className="chat">
        {
            // ! если в URL передан несуществующий ID - "выберите чат"
            chatID && chats.find((chat) => chatID===chat.id) ? (
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