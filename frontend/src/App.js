import { useState } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { Container, CssBaseline } from '@material-ui/core';
import './App.css';
import Header from './components/Header';
import MessageForm from './components/MessageForm';
import MessageList from './components/MessageList';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null)

  console.log(token);

  // TODO: Use react router <Redirect /> to force login when no token
  // TODO: Update backend to require authentication then pass token

  return (
    <Router>
      <CssBaseline />
      <Header user={user} />
      <Container>
        <Switch>
          <Route path='/signin'>
            <SignIn setUser={setUser} setToken={setToken} />
            {token ? <Redirect to='/' /> : null}
          </Route>
          <Route path='/signup'>
            <SignUp setUser={setUser} setToken={setToken} />
            {token ? <Redirect to='/' /> : null}
          </Route>
          <Route path='/message'>
            <MessageForm user={user} />
            {!token ? <Redirect to='signin' /> : null}
          </Route>
          <Route path='/'>
            <MessageList user={user} />
            {!token ? <Redirect to='signin' /> : null}
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
