import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import '../.././index.css';

export const ChatMessageForm = (
  messageAuthor,
  setMessageAuthor,
  isMessageSent,
  messageText,
  setMessageText,
  handleAddMessage,
) => {
  return (
    <form className="message-form">
      <p style={{ marginTop: '10px' }}>Send new message:</p>
      <div className="message-form_container">
        <TextField
          id="outlined-basic"
          label="Name"
          name="author"
          value={messageAuthor || ''}
          onChange={(e) => setMessageAuthor(e.target.value)}
          variant="outlined"
          margin="normal"
          autoFocus={!isMessageSent}
        />
        <TextField
          id="outlined-multiline-flexible"
          margin="normal"
          label="Text"
          name="text"
          value={messageText || ''}
          onChange={(e) => setMessageText(e.target.value)}
        />
        <Button onClick={handleAddMessage} variant="contained" color="success">
          Send message
        </Button>
      </div>
    </form>
  );
};
