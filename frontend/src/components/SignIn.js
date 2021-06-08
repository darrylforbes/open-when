import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  makeStyles,
  TextField,
  Typography
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { apiUrl } from '../utils';

const useStyles = makeStyles((theme) => ({
  box: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2)
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
    margin: theme.spacing(1),
  },
  formElement: {
    margin: theme.spacing()
  },
  title: {
    margin: theme.spacing(1)
  }
}));

const SignIn = ({ setUser, setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const classes = useStyles();

  const sendRequest = async (ev) => {
    ev.preventDefault();

    // Make sure form is filled out
    if (!username || !password) {
      setError('Enter username and password');
      return
    }

    const data = new URLSearchParams();
    data.set('username', username);
    data.set('password', password);

    try {
      const response = await fetch(apiUrl + '/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
      });

      if (response.status === 200) {
        const json = await response.json();
        setToken(json.access_token);
        setUser(await getMe(json.access_token));
      } else if (response.status === 401) {
        setError('Invalid credentials');
      } else {
        console.log(response.status);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const getMe = async (token) => {
    if (!token) return null;
    const response = await fetch(apiUrl + '/users/me', {
      credentials: 'include',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 200) {
      return await response.json();
    } else {
      return null;
    }
  }

  return (
    <Box className={classes.box}>
      <Typography className={classes.title} variant='h1'>Sign in</Typography>
      {
        error ?
          <Card className={classes.error}>
            <Typography variant='body1'>{error}</Typography>
          </Card>
          : null
      }
      <form className={classes.form}>
        <TextField
          id='username'
          label='Username'
          onChange={(ev) => setUsername(ev.target.value)}
          variant='outlined'
          className={classes.formElement}
          required
          autoFocus
        />
        <TextField
          id='password'
          label='Password'
          onChange={(ev) => setPassword(ev.target.value)}
          variant='outlined'
          className={classes.formElement}
          required
          type='password'
        />
        <Button
          variant='contained'
          type='submit'
          onClick={sendRequest}
          className={classes.formElement}
          color='primary'
        >
          Sign in
        </Button>
      </form>
      <Link to='signup'>New user? Create an account</Link>
    </Box>
  )
}

export default SignIn;
