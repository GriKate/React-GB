//import './App.css';
import { Form } from './components/Form';
import { Form as FormClass } from './class-components/Form';
import { Count as CountClass } from './class-components/Count';
import { Count } from './components/Count';
import { Child } from './components/Child';
import { Message } from './components/message/Message';
import {useState} from 'react';
import './index.css';


function App() {
  const [newName, setName] = useState('myname')
  const [childMessage, setChildMessage] = useState('This message was sent from Parent')
  const [parentMessage, setParentMessage] = useState('...message?')

  const handleChangeName = (e) => {
    setName(e.target.value)
  }

  return (
    <div className="App">
      {/* <Form /> */}
      {/* <CountClass count={1}/> */}
      <h1>Class component</h1>
      <Count name="geekbrains" />
      <hr />
      <FormClass />
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
      <Message message={childMessage} handleChangeMessage={setParentMessage} />
    </div>
  );
}

export default App;
