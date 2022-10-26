//import './App.css';
import { Form } from './components/Form';
import { Form as FormClass } from './class-components/Form';
import { Count as CountClass } from './class-components/Count';
import { Count } from './components/Count';
import { Child } from './components/Child';
import { Message } from './components/message/Message';
import {useEffect, useState} from 'react';
import './index.css';


function App({messages, addMessage}) {
  const [newName, setName] = useState('myname')
  const [childMessage, setChildMessage] = useState('This message was sent from Parent')
  const [parentMessage, setParentMessage] = useState('...message?')
  const [messageList, setMessageList] = useState([])
  // разделить newMessage на 2 стейта: author и text. Массив при сете перетирается полностью
  const [messageAuthor, setMessageAuthor] = useState('')
  const [messageText, setMessageText] = useState('')
  const [isMessageSent, setMessageSent] = useState(false)

  console.log(messages)

  const handleChangeName = (e) => {
    setName(e.target.value)
  }

  useEffect(() => {
    setMessageList(messages)
    console.log('e')
    // showMessage()
  }, [])

  // const showMessage = () => {
  //   if(newMessage) alert(newMessage.name + ", your message is published")
  // }

  // const handleSetMessage = (e) => {
  //   const name = e.target.name
  //   const value = e.target.value
  //   setNewMessage({[name]: value})
  // }

  const handleAddMessage = (e) => {
    e.preventDefault()
    console.log(messageAuthor)
    console.log(messageText)

    let inputMessage = {}
    if(messageText.length && messageAuthor.length) {
      inputMessage = {author: messageAuthor, text: messageText}
    } else return

    // изменяем стейт для перерендера через useEffect
    setMessageSent(true)

    // передаём inputMessage в родительскую ф-ию 
    // если передать в неё newMessage из стейта, новое сообщение отобразится только при след. рендере
    addMessage(inputMessage)

    console.log(messages)
    console.log(messageList) 
    e.target[0].value = ''
    e.target[1].value = ''
  }

  return (
    <div className="App">
      {messageList.map((el, idx) => 
        el ?
        <div key={idx}>
          <h3 key={el.author.idx}>{el.author}</h3>
          <p key={el.text.idx}>{el.text}</p>
        </div> : null)
      }
      <form onSubmit={handleAddMessage}>
        <label>
          Имя:
          <input 
            name="author"
            type="text" 
            value={messageAuthor  || ''} 
            onChange={e => setMessageAuthor(e.target.value)}
          ></input>
          {/* onChange={e => setNewMessage({author: e.target.value})} */}
        </label>
        <br />
        <label>
          Текст:
          <input 
            name="text"
            type="text" 
            value={messageText  || ''} 
            onChange={e => setMessageText(e.target.value)}
          ></input>
        </label>
        <button>Send message</button>
      </form>
      {/* <Form /> */}
      {/* <CountClass count={1}/> */}
      {/* <h1>Class component</h1>
      <Count name="geekbrains" />
      <hr />
      <FormClass /> */}
      <hr />
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
        renderMessages={messageList} />
    </div>
  );
}

export default App;
