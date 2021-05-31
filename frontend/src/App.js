import { useState } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import './App.css';
import MessageForm from './components/MessageForm';
import MessageList from './components/MessageList';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null)

  // TODO: Use react router <Redirect /> to force login when no token
  // TODO: Update backend to require authentication then pass token

  return (
    <Router>
      <h1>Hello {user ? user.username : ''}</h1>
      <h2>token: {token}</h2>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/signin'>Sign in</Link>
        </li>
        <li>
          <Link to='/signup'>Sign up</Link>
        </li>
        <li>
          <Link to='/message'>New Message</Link>
        </li>
      </ul>
      <Switch>
        <Route path='/signin'>
          <SignIn setUser={setUser} setToken={setToken} />
        </Route>
        <Route path='/signup'>
          <SignUp setUser={setUser} setToken={setToken} />
        </Route>
        <Route path='/message'>
          <MessageForm user={user} />
        </Route>
        <Route path='/'>
          <MessageList user={user} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
