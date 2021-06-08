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
    margin: theme.spacing(2),
  },
  formElement: {
    margin: theme.spacing()
  },
  title: {
    margin: theme.spacing(1)
  }
}));

const SignUp = ({ setUser, setToken }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const classes = useStyles();

  const sendRequest = async (ev) => {
    ev.preventDefault();

    // Make sure form is filled out
    if (!email || !username || !password) {
      setError('Enter email, username, and password');
      return
    }

    const data = {
      'email': email,
      'username': username,
      'password': password
    };

    const response = await fetch(apiUrl + '/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.status === 200) {
      setUser(await response.json());
      getToken();
    } else if (response.status === 400) {
      setError((await response.json()).detail);
    } else {
      console.log(await response.json());
    }
  }

  const getToken = async () => {
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
      } else if (response.status === 401) {
        setError('Invalid credentials');
      } else {
        console.log(response.status);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Box className={classes.box}>
      <Typography className={classes.title} variant='h1'>Sign up</Typography>
      {
        error ?
          <Card className={classes.error}>
            <Typography variant='body1'>{error}</Typography>
          </Card>
          : null
      }
      <form className={classes.form}>
        <TextField
          id='email'
          label='Email'
          onChange={(ev) => setEmail(ev.target.value)}
          variant='outlined'
          className={classes.formElement}
          required
          autoFocus
        />
        <TextField
          id='username'
          label='Username'
          onChange={(ev) => setUsername(ev.target.value)}
          variant='outlined'
          className={classes.formElement}
          required
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
        >
          Sign up
        </Button>
      </form>
      <Link to='signin'>Already have an account? Log in</Link>
    </Box>
  )
}

export default SignUp;
