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

  const handleChangeName = (e) => {
    setName(e.target.value)
  }

  useEffect(() => {
    setMessageList(messages)
  }, [])

  useEffect(() => {
    if(isMessageSent) {
      console.log('eff')
      showMessage()
      setMessageSent(false)
      setMessageText('')
      setMessageAuthor('')
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
      <form 
        onSubmit={handleAddMessage} 
        style={{width: '300px', marginTop: '20px', padding: '5px', border: '1px solid #fff'}}
        >
        <p style={{marginTop: '10px'}}>Send new message:</p>
        <div style={{display: 'flex', flexDirection: 'column', margin: '20px 0'}}>
          <label>
            Имя:
            <input 
              name="author"
              type="text" 
              value={messageAuthor  || ''} 
              onChange={e => setMessageAuthor(e.target.value)}
              style={{marginLeft: '10px'}}
            ></input>
          </label>
          <br />
          <label>
            Текст:
            <input 
              name="text"
              type="text" 
              value={messageText  || ''} 
              onChange={e => setMessageText(e.target.value)}
              style={{marginLeft: '10px'}}
            ></input>
          </label>
          <button 
            style={{width: '150px', padding: '10px 0', marginTop: '30px', backgroundColor: 'salmon'}}
          >Send message</button>
        </div>
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
