import { useState } from 'react';
import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography
} from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import { apiUrl } from '../utils';

const useStyles = makeStyles({
  box: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    margin: 20
  },
  button: {
    width: 90,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%'
  },
  form: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: 300,
    justifyContent: 'space-between',
    margin: 20,
    padding: 20
  }
})

const MessageForm = ({ user }) => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [recipientId, setRecipientId] = useState(null)
  const [isMessageSent, setIsMessageSent] = useState(false);

  const classes = useStyles();

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
    <Box className={classes.box}>
      {isMessageSent ? <Redirect to='/' /> : null}
      <Typography variant='h1'>Message</Typography>
      <form className={classes.form}>
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
        <Box className={classes.buttons}>
          <Button
            className={classes.button}
            variant='contained'
            component={ Link }
            to='/'
          >
            Cancel
          </Button>
          <Button
            className={classes.button}
            variant='contained'
            color='primary'
            type='submit'
            onClick={sendRequest}
          >
            Send
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default MessageForm;
