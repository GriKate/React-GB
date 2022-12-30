import {initState} from '../initState'

export const profilesReducer = (state = initState, action) => {
    const {type, payload} = action
    switch (type) {
        case 'SET_PROFILES':
            return payload
        case 'SET_NEW_PROFILE':
            return [...state, payload]
        case 'SET_AUTH':
            const user = state.find((el) => el.name === 'Sue')
            user.isAuth = payload
            console.log(user)
            return [user]
        default:
            return state;
    }
}