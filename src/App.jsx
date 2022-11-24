//import './App.css';
import { Form } from './components/Form';
import { Form as FormClass } from './class-components/Form';
import { Count as CountClass } from './class-components/Count';
import { Count } from './components/Count';
import { Child } from './components/Child';
import { Message } from './components/message/Message';
import { Home } from './components/Home';
import {Profile} from './components/profile/Profile';
import { Chats } from './components/chats/Chats';
import { NotFound } from './components/NotFound';

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

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  BrowserRouter,
  Routes,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "chats",
        element: <Chats />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ]
  },
]);

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
  const [isDark, setIsDark] = useState(false)

  return (
    <BrowserRouter>
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
    <div className="App">
      <Button onClick={()=>{setIsDark(prev => !prev)}} variant="contained">Change Theme</Button>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <Link to='/'>Main page</Link>
        <Link to='chats'>Chats</Link>
        <Link to='profile'>Profile</Link>
      </div>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='chats' element={<Chats messages={messages} addMessage={addMessage} />}>
          <Route path=':chatID' element={<Chats messages={messages} addMessage={addMessage} />}></Route>
        </Route>
        <Route path='profile' element={<Profile />}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
      </div>
    </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
