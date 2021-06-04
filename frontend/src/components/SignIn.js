import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { apiUrl } from '../utils';

const SignIn = ({ setUser, setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const sendRequest = async (ev) => {
    ev.preventDefault();

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
        // TODO: popup some error message saying invalid credentials
        console.log('Invalid credentials');
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
    <Container>
      <Box>
        <Typography variant='h1'>Sign in</Typography>
        <form>
          <TextField
            id='username'
            label='Username'
            onChange={(ev) => setUsername(ev.target.value)}
            variant='outlined'
            required
            autoFocus
          />
          <TextField
            id='password'
            label='Password'
            onChange={(ev) => setPassword(ev.target.value)}
            variant='outlined'
            required
          />
          <Button
            type='submit'
            onClick={sendRequest}
          >
            Sign in
          </Button>
        </form>
        <Link to='signup'>New user? Create an account</Link>
      </Box>
    </Container>
  )
}

export default SignIn;
