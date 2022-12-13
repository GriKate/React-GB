import SubmitButton from '../UI/SubmitButton'
import { useDispatch, useSelector } from 'react-redux'

import { useState } from 'react'

import { getIdea } from '../../redux/ideasReducers/selectors'

export const StartupIdeas = () => {
    const dispatch = useDispatch()
    const idea = useSelector(getIdea)

    const [loading, setLoading] = useState(false)

    const showIdea = (e) => {
        dispatch(getIdeaMiddleware())
    }

    const getIdeaMiddleware = () => async (dispatch, getState) => {
        try {
            setLoading(true)
            // await fetch('https://bac')
            await fetch('https://baconipsum.com/api/?type=meat-and-filler')
            .then((res) => res.json())
            .then((data) => 
                dispatch({
                    type: 'SET_IDEA',
                    payload: data[0]
                })
            )
        } catch (err) {
            console.log(err)
            dispatch({
                type: 'SET_IDEA',
                payload: ''
            })
            showErrorMessage()
        } finally {
            setLoading(false)
        }
    }

    const showErrorMessage = () => {
        alert('We can`t download the data, please try again')
    }

    return <>
        <hr></hr>
        <h1>New Startup Idea for you:</h1>
        {loading && <p>Loading data</p>}
        <p>{idea}</p>
        <hr></hr>
        <SubmitButton onClick={showIdea}>Get Idea!</SubmitButton>
    </>
}