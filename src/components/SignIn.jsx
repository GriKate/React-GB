import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../services/firebase';

import TextField from '@mui/material/TextField';
import SubmitButton from './UI/SubmitButton';

export const SignIn = () => {
  const [inputs, setInputs] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInput = (e) => {
    // prev, чтобы дозаписывал пароль к имейлу
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      setError('');
      await signIn(inputs.email, inputs.password);
      navigate('/profile');
    } catch (error) {
      setError(error);
    } finally {
      setInputs({ email: '', password: '' });
    }
  };

  // const signIn = (e) => {
  //     e.preventDefault()
  //     if (inputs.email === 'q@w.e' && inputs.password === 'gb') {
  //         dispatch({
  //             type: 'SET_AUTH',
  //             payload: true
  //           })
  //         navigate('/profile')
  //     } else {
  //         setInputs({email: '', password: ''})
  //         alert('Uncorrect email/password')
  //     }
  // }

  return (
    <>
      <h1>Sign in</h1>
      <form className="message-form">
        <div className="message-form_container">
          <TextField
            type="email"
            label="Email"
            name="email"
            value={inputs.email}
            onChange={handleInput}
            variant="outlined"
            margin="normal"
          />
          <TextField
            type="password"
            label="Password"
            name="password"
            value={inputs.password}
            onChange={handleInput}
            variant="outlined"
            margin="normal"
          />
          <SubmitButton onClick={handleSignIn}>Sign In</SubmitButton>
        </div>
      </form>
      {error && <p style={{ color: 'red' }}>{error.message}</p>}
    </>
  );
};
