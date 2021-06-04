import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { apiUrl } from '../utils';

const SignUp = ({ setUser, setToken }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const sendRequest = async (ev) => {
    ev.preventDefault();

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
      console.log(await response.json());
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
        console.log('Invalid credentials');
      } else {
        console.log(response.status);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Box>
      <Typography variant='h1'>Sign up</Typography>
      <form>
        <TextField
          id='email'
          label='Email'
          onChange={(ev) => setEmail(ev.target.value)}
          variant='outlined'
          required
          autoFocus
        />
        <TextField
          id='username'
          label='Username'
          onChange={(ev) => setUsername(ev.target.value)}
          variant='outlined'
          required
        />
        <TextField
          id='password'
          label='Password'
          onChange={(ev) => setPassword(ev.target.value)}
          variant='outlined'
          required
          type='password'
        />
        <Button
          variant='contained'
          type='submit'
          onClick={sendRequest}
        >
          Sign up
        </Button>
      </form>
      <Link to='signin'>Already have an account? Log in</Link>
    </Box>
  )
}

export default SignUp;
