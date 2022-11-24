import { Home } from './components/Home';
import {Profile} from './components/profile/Profile';
import { Chats } from './components/chats/Chats';
import { NotFound } from './components/NotFound';

import {useEffect, useState} from 'react';
import './index.css';

import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  BrowserRouter,
  Routes,
  Navigate
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

function App({messages, addMessage}) {
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
          <Route path='chats' element={<Chats />}>
            <Route path=':chatID' element={<Chats />}></Route>
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
