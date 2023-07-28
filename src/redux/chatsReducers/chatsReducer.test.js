import chatsReducer from './chatsReducer';
import expect from 'expect';

describe('chats reducer', () => {
  const data = { id: 23, name: 'Chat' };

  it('should handle ADD_NEW_CHAT', () => {
    const successAction = {
      type: 'ADD_NEW_CHAT',
      payload: data,
    };
    expect(chatsReducer(successAction)).toEqual(data);
  });
});
