import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography
} from '@material-ui/core';
import { apiUrl } from '../utils';

const MessageForm = ({ user }) => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [recipientId, setRecipientId] = useState(null)

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
        const json = await response.json();
        console.log(json);
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
    <Container>
      <Box>
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
            type='submit'
            onClick={sendRequest}
          >
            Send
          </Button>
        </form>
      </Box>
    </Container>
  )
}

export default MessageForm;
