import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signUp } from '../services/firebase'

import TextField from '@mui/material/TextField';
import SubmitButton from './UI/SubmitButton';

export const SignUp = () => {
    const [inputs, setInputs] = useState({email: '', password: ''})
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleInput = (e) => {
        // prev, чтобы дозаписывал пароль к имейлу
        setInputs((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleSignUp = async (e) => {
        e.preventDefault()
        try {
            setError('')
            await signUp(inputs.email, inputs.password)
            navigate('/signin')
        } catch (error) {
            setError(error)
        } finally {
            setInputs({email: '', password: ''})
        }
    }

    return <>
    <h1>Sign up</h1>
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
        <SubmitButton onClick={handleSignUp}>Sign Up</SubmitButton>
        </div>
    </form>
    {error && <p style={{color: 'red'}}>{error.message}</p>}
    </>
}