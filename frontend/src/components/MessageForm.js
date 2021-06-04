import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography
} from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import { apiUrl } from '../utils';

const MessageForm = ({ user }) => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [recipientId, setRecipientId] = useState(null)
  const [isMessageSent, setIsMessageSent] = useState(false);

  const sendRequest = async (ev) => {
    ev.preventDefault();

    const data = {
      'title': title,
      'body': body,
      'recipient_id': recipientId,
      'sender_id': user.id
    }

    try {
      const response = await fetch(apiUrl + '/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.status === 200) {
        setIsMessageSent(true);
      } else if (response.status === 401) {
        console.log(response.status);
      } else {
        console.log(response.status);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Box>
      {isMessageSent ? <Redirect to='/' /> : null}
      <Typography variant='h1'>Message</Typography>
      <form>
        <TextField
          id='title'
          label='Title'
          onChange={(ev) => setTitle(ev.target.value)}
          variant='outlined'
          required
          autoFocus
        />
        <TextField
          id='body'
          label='Body'
          onChange={(ev) => setBody(ev.target.value)}
          variant='outlined'
          required
          multiline
        />
        <TextField
          id='recipientId'
          label='Recipient ID'
          onChange={(ev) => setRecipientId(ev.target.value)}
          variant='outlined'
          type='number'
          required
        />
        <Button
          component={ Link }
          to='/'
        >
          Cancel
        </Button>
        <Button
          type='submit'
          onClick={sendRequest}
        >
          Send
        </Button>
      </form>
    </Box>
  )
}

export default MessageForm;
