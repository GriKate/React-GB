import { Home } from './components/Home';
import { Profile } from './components/profile/Profile';
import { Chats } from './components/chats/Chats';
import { NotFound } from './components/NotFound';
import { StartupIdeas } from './components/ideas/startupIdeas';
import { SignIn } from './components/SignIn';
import { SignUp } from './components/SignUp';
import { SignOut } from './components/SignOut';

import { useEffect, useState } from 'react';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom'

import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material';

import { PrivateRoutes } from './components/routes/PrivateRoutes';

import { firebaseAuth, logOut } from './services/firebase';

import {
  createBrowserRouter,
  // RouterProvider,
  Route,
  Link,
  BrowserRouter,
  Routes,
  // Navigate,
  // useNavigate,
} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'chats',
        element: <Chats />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
]);

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App({ messages, addMessage }) {
  const [isDark, setIsDark] = useState(false);

  const dispatch = useDispatch();
  // const navigate = useNavigate()
  const inputs = useSelector((store) => store.inputProfileReducer);

  useEffect(() => {
    const isAuth = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: 'SET_AUTH',
          payload: true,
        });
      } else {
        dispatch({
          type: 'SET_AUTH',
          payload: false,
        });
      }
    });
    return isAuth;
  }, []);

  const signOut = async () => {
    await logOut();
    console.log('exit');
    // не перенаправляет из App!
    // navigate('/signin')
  };

  const setProfile = (e) => {
    // console.log(e.target.value)
    dispatch({
      type: 'PROFILE_INPUT',
      payload: { [e.target.name]: e.target.value },
    });
  };

  const submitProfile = (e) => {
    e.preventDefault();
    console.log(inputs);
    inputs.isAuth = false;
    dispatch({
      type: 'SET_NEW_PROFILE',
      payload: inputs,
    });
    dispatch({
      type: 'PROFILE_INPUT_CLEAR',
      payload: { name: '', isMember: '', isAuth: false },
    });
  };

  return (
    <BrowserRouter>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <div className="App">
          <Button
            onClick={() => {
              setIsDark((prev) => !prev);
            }}
            variant="contained"
          >
            Change Theme
          </Button>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Link to="/">Main page</Link>
            <Link to="chats">Chats</Link>
            <Link to="profile">Profile</Link>
            <Link to="startup-ideas">Startup Ideas</Link>
            <Link to="signin">Sign In</Link>
            <Link to="signup">Sign Up</Link>
            <Link to="signout" onClick={signOut}>
              Sign Out
            </Link>
          </div>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="chats" element={<Chats />}>
              <Route path=":chatID" element={<Chats />}></Route>
            </Route>
            <Route
              path="profile"
              element={
                <PrivateRoutes
                  component={
                    <Profile
                      setProfile={setProfile}
                      submitProfile={submitProfile}
                    />
                  }
                />
              }
            ></Route>
            <Route path="startup-ideas" element={<StartupIdeas />}></Route>
            <Route path="signin" element={<SignIn />}></Route>
            <Route path="signup" element={<SignUp />}></Route>
            <Route path="signout" element={<SignOut />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
