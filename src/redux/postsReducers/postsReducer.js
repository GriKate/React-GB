import {initState} from '../initState'

export const postsReducer = (state = initState, action) => {
    const {type, payload} = action
    switch (type) {
        case '':
            return {...state, ...payload}
        default:
            return state;
    }
}