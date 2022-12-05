import {initState} from '../initState'

// хранит текущее значение формы ввода имени чата
export const inputMessageReducer = (state = initState, action) => {
    const {type, payload} = action
    switch (type) {
        // возвращаем новый объект сообщения
        case 'SET_MESSAGE_INPUT':
            return {...state, ...payload}
        case 'MESSAGE_INPUT_CLEAR':
            return {...payload}
        default:
            return state;
    }
}