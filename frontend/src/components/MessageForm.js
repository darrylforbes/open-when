import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  makeStyles,
  TextField,
  Typography
} from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import { apiUrl } from '../utils';

const useStyles = makeStyles((theme) => ({
  box: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2)
  },
  button: {
    width: 90,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%'
  },
  error: {
    backgroundColor: theme.palette.error.main,
    margin: theme.spacing(),
    padding: theme.spacing()
  },
  form: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: theme.spacing(2),
  },
  formElement: {
    margin: theme.spacing()
  },
  title: {
    margin: theme.spacing(1)
  }
}));

const MessageForm = ({ user }) => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [recipientId, setRecipientId] = useState(null)
  const [error, setError] = useState('');
  const [isMessageSent, setIsMessageSent] = useState(false);

  const classes = useStyles();

  const sendRequest = async (ev) => {
    ev.preventDefault();

    if (!title || !body || !recipientId) {
      setError('Enter all fields');
      return
    }

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
        setError((await response.json()).detail);
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
      <Typography classname={classes.title} variant='h1'>New Message</Typography>
      {
        error ?
          <Card className={classes.error}>
            <Typography variant='body1'>{error}</Typography>
          </Card>
          : null
      }
      <form className={classes.form}>
        <TextField
          id='title'
          label='Open when...'
          onChange={(ev) => setTitle(ev.target.value)}
          variant='outlined'
          className={classes.formElement}
          required
          autoFocus
        />
        <TextField
          id='body'
          label='Body'
          onChange={(ev) => setBody(ev.target.value)}
          variant='outlined'
          className={classes.formElement}
          required
          multiline
        />
        <TextField
          id='recipientId'
          label='Recipient ID'
          onChange={(ev) => setRecipientId(ev.target.value)}
          variant='outlined'
          className={classes.formElement}
          type='number'
          required
        />
        <Box className={[classes.buttons, classes.formElement]}>
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
