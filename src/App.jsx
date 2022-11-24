//import './App.css';
import { Form } from './components/Form';
import { Form as FormClass } from './class-components/Form';
import { Count as CountClass } from './class-components/Count';
import { Count } from './components/Count';
import { Child } from './components/Child';
import { Message } from './components/message/Message';
import {useEffect, useState} from 'react';
import './index.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
})

function App({chats, messages, addMessage}) {
  const [newName, setName] = useState('myname')
  const [childMessage, setChildMessage] = useState('This message was sent from Parent')
  const [parentMessage, setParentMessage] = useState('...message?')
  const [messageList, setMessageList] = useState([])
  // разделить newMessage на 2 стейта: author и text. Массив при сете перетирается полностью
  const [messageAuthor, setMessageAuthor] = useState('')
  const [messageText, setMessageText] = useState('')
  const [isMessageSent, setMessageSent] = useState(false)
  const [isDark, setIsDark] = useState(false)

  const handleChangeName = (e) => {
    setName(e.target.value)
  }

  useEffect(() => {
    setMessageList(messages)
  }, [])

  useEffect(() => {
    if(isMessageSent) {
      // console.log('eff')
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

    // console.log(messages)
    // console.log(messageList) 
  }

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
    <div className="App">
      <Button onClick={()=>{setIsDark(prev => !prev)}} variant="contained">Change Theme</Button>
      <div className="wrapper">
        <div className="chat-list">
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
        </div>
        <div className="chat">
          {messageList.map((el, idx) => 
            el ?
            <div key={idx}>
              <h3 key={el.author.idx}>{el.author}</h3>
              <p key={el.text.idx}>{el.text}</p>
            </div> : null)
          }
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
              <Button onClick={handleAddMessage} variant="contained" color="success">Send message</Button>
            </div>
          </form>
        </div>
        {/* <Form /> */}
        {/* <CountClass count={1}/> */}
        {/* <h1>Class component</h1>
        <Count name="geekbrains" />
        <hr />
        <FormClass /> */}
        {/* <hr />
        <hr />
        <h1>Parent component</h1>
        <h3>This message was sent from Message Component:</h3>
        <p>{parentMessage}</p>
        <h3>This message was sent to Child Component:</h3>
        <input onChange={handleChangeName} />
        <h1>Child component</h1>
        <Child name={newName}/>
        <hr />
        <h1>Message component</h1>
        <Message 
          message={childMessage} 
          handleChangeMessage={setParentMessage} 
          renderMessages={messageList} /> */}
      </div>
    </div>
    </ThemeProvider>
  );
}

export default App;
