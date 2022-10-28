import {useEffect, useState} from 'react';
import '.././index.css';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export const Home = ({chats, messages, addMessage}) => {
    const [messageList, setMessageList] = useState([])
    // разделить newMessage на 2 стейта: author и text. Массив при сете перетирается полностью
    const [messageAuthor, setMessageAuthor] = useState('')
    const [messageText, setMessageText] = useState('')
    const [isMessageSent, setMessageSent] = useState(false)

    useEffect(() => {
        setMessageList(messages)
    }, [])
    
    useEffect(() => {
        if(isMessageSent) {
            showMessage()
            setMessageSent(false)
            setMessageText('')
            setMessageAuthor('')
            document.getElementById('outlined-basic').focus();
        }
    })
    
    const showMessage = () => {
        if(messageAuthor) alert(messageAuthor + ", your message is published")
    }
    
    const handleAddMessage = (e) => {
        e.preventDefault()
    
        let inputMessage = {}
        if(messageText.length && messageAuthor.length) {
          inputMessage = {author: messageAuthor, text: messageText}
        } else return
    
        // изменяем стейт для перерендера через useEffect
        setMessageSent(true)
        // передаём inputMessage в родительскую ф-ию 
        // если передать в неё newMessage из стейта, новое сообщение отобразится только при след. рендере
        addMessage(inputMessage)
    }

    return <>
        <h1>Home</h1>
        <div className="wrapper">
            {/* <div className="chat-list">
            <List>
                {chats.map((el, idx) => 
                el ?
                <ListItem disablePadding key={idx}>
                    <ListItemButton>
                    <ListItemText primary={el.name} />
                    </ListItemButton>
                </ListItem> : null
                )}
            </List>
            </div> */}
            <div className="chat">
            {/* {messageList.map((el, idx) => 
                el ?
                <div key={idx}>
                <h3 key={el.author.idx}>{el.author}</h3>
                <p key={el.text.idx}>{el.text}</p>
                </div> : null)
            } */}
            {/* <form className="message-form">
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
            </form> */}
            </div>
        </div>
    </>

}