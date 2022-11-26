import {initState} from '../initState'

export const profilesReducer = (state = initState, action) => {
    const {type, payload} = action
    switch (type) {
        case 'SET_PROFILES':
            return payload
        case 'SET_NEW_PROFILE':
            return [...state, payload]
        default:
            return state;
    }
}