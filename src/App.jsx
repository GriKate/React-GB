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
  const [newMessage, setNewMessage] = useState("")

  console.log(messages)

  const handleChangeName = (e) => {
    setName(e.target.value)
  }

  useEffect(() => {
    setMessageList(messages)
    console.log('e')
    showMessage()
  }, [])

  const showMessage = () => {
    if(newMessage) alert(newMessage.name + ", your message is published")
  }

  const handleSetMessage = (e) => {
    e.preventDefault()

    let messageText = e.target[0].value
    let inputMessage = {}
    if(messageText.length) {
      inputMessage = {author: 'Sue', text: messageText}
    } else return

    // изменяем стейт для перерендера через useEffect
    setNewMessage(inputMessage)

    // передаём в родительскую ф-ию inputMessage
    // если передать newMessage из стейта, новое сообщение отобразится только при след. рендере
    addMessage(inputMessage)

    console.log(messages)
    console.log(messageList) 
    e.target[0].value = ''
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
      <form onSubmit={handleSetMessage}>
        <input type="text" onChange={value => setMessageList}></input>
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
