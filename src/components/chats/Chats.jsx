import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'

import {useEffect, useState} from 'react';
import '../.././index.css';

import {ChatMessages} from '../message/ChatMessages'
import {ChatMessageForm} from '../message/ChatMessageForm'

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

import { getChatInput } from '../../redux/chatsReducers/selectors'
import { getChats } from '../../redux/chatsReducers/selectors'
import { getMessageInput } from '../../redux/messagesReducer/selectors'

export const Chats = () => {
    // разделить newMessage на 2 стейта: author и text. Массив при сете перетирается полностью
    // const [messageAuthor, setMessageAuthor] = useState('')
    // const [messageText, setMessageText] = useState('')
    const [isMessageSent, setMessageSent] = useState(false)
    const dispatch = useDispatch()
    const chatInput = useSelector(getChatInput)
    const chats = useSelector(getChats)
    const messageInput = useSelector(getMessageInput)

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
    
    // useEffect(() => {
    //     if(isMessageSent) {
    //         setMessageSent(false)
    //         document.getElementById('outlined-basic').focus();
    //     }
    // })
    
    const showBotMessage = (author) => {
        if(author) alert(author + ", your message is published")
    }

    const setMessageInput = (e) => {
        dispatch({
          type: 'SET_MESSAGE_INPUT', 
          payload: {[e.target.name]: e.target.value}
        })
    }

    const submitMessage = (e) => {
        e.preventDefault()

        if(messageInput.author.length && messageInput.text.length) {
            messageInput.id = String(Math.floor(Math.random() * 1000))
            messageInput.chatId = chatID
        } else {
            alert("Type the author and the text")
            return
        }
        // dispatch({
        //     type: 'ADD_NEW_MESSAGE',
        //     payload: messageInput
        // })
        // изменяем стейт для перерендера через useEffect
        // setMessageSent(true)
        // showBotMessage(messageInput.author)
        dispatch(botMessageMiddleware())
        dispatch({
            type: 'MESSAGE_INPUT_CLEAR', 
            payload: {author: '', text: '', id: '', chatId: ''}
        })
        document.getElementById('outlined-basic').focus();
    }

    const botMessageMiddleware = () => async (dispatch, getState) => {
        await setTimeout(() => {alert(messageInput.author + ", your message is published")}, 1000)
        dispatch({
            type: 'ADD_NEW_MESSAGE',
            payload: messageInput
        })
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

        chatInput.id = String(Math.floor(Math.random() * 1000))
        dispatch({
            type: 'ADD_NEW_CHAT',
            payload: chatInput
        })
        dispatch({
            type: 'CHAT_INPUT_CLEAR', 
            payload: {name: '', id: ''}
          })
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
                <>
                <ChatMessages />
                <form className="message-form">
                    <p style={{marginTop: '10px'}}>Send new message:</p>
                    <div className="message-form_container">
                        <TextField 
                            id="outlined-basic" 
                            label="Name" 
                            name="author"
                            value={messageInput.author} 
                            onChange={setMessageInput}
                            variant="outlined" 
                            margin="normal" 
                            autoFocus={!isMessageSent}
                        />
                        <TextField
                            id="outlined-multiline-flexible"
                            margin="normal" 
                            label="Text"
                            name="text"
                            value={messageInput.text}
                            onChange={setMessageInput}
                            />
                        <Button 
                            onClick={submitMessage} 
                            variant="contained" 
                            color="success"
                            >Send message</Button>
                    </div>
                </form>
            </>
                // chats.map((chat, idx) => 
                //     chatID && chatID===chat.id ?
                //     <div key={chat.id}>
                    
                // <ChatMessages 
                //     chat={chat} 
                //     messageAuthor={messageAuthor} 
                //     setMessageAuthor={setMessageAuthor}
                //     isMessageSent={isMessageSent}
                //     messageText={messageText}
                //     setMessageText={setMessageText}
                //     handleAddMessage={handleAddMessage}
                //     key={chat.id}/> 
                    // <ChatMessageForm 
                    //     messageAuthor={messageAuthor} 
                    //         setMessageAuthor={setMessageAuthor}
                    //         isMessageSent={isMessageSent}
                    //         messageText={messageText}
                    //         setMessageText={setMessageText}
                    //         handleAddMessage={handleAddMessage}/>
            ) : <h3>Choose the Chat</h3>
        }
        </div>
        </div>
    </>
}