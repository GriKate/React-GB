export const setMessageInput = (e) => {
    return {
      type: 'SET_MESSAGE_INPUT', 
      payload: {[e.target.name]: e.target.value}
    }
}

export const clearMessageInput = () => {
    return {
        type: 'MESSAGE_INPUT_CLEAR', 
        payload: {author: '', text: '', id: '', chatId: ''}
    }
}

export const addNewMessage = (messageInput) => {
    return {
        type: 'ADD_NEW_MESSAGE',
        payload: messageInput
    }
}

export const deleteChat = (chatToDelete) => {
    return {
        type: 'DELETE_CHAT', 
        payload: chatToDelete
    }
}

export const setChatInput = (e) => {
    return {
      type: 'SET_CHAT_INPUT', 
      payload: {[e.target.name]: e.target.value}
    }
}

export const addNewChat = (chatInput) => {
    return {
        type: 'ADD_NEW_CHAT',
        payload: chatInput
    }
}

export const clearChatInput = () => {
    return {
        type: 'CHAT_INPUT_CLEAR', 
        payload: {name: '', id: ''}
    }
  }