import {initState} from '../initState'

// хранит текущее значение формы ввода имени чата
export const ideaReducer = (state = initState, action) => {
    const {type, payload} = action
    switch (type) {
        case 'SET_IDEA':
            return payload
        case 'SHOW_NEW_IDEA':
            return state
        default:
            return state;
    }
}