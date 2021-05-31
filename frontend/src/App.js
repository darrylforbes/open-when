import { useState } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import './App.css';
import MessageList from './components/MessageList';
import SignIn from './components/SignIn';
import MessageForm from './components/MessageForm';

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null)

  return (
    <Router>
      <h1>{user ? user.username : ''}</h1>
      <h2>{token}</h2>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/signin'>Sign in</Link>
        </li>
        <li>
          <Link to='/message'>New Message</Link>
        </li>
      </ul>
      <Switch>
        <Route path='/signin'>
          <SignIn setUser={setUser} setToken={setToken} />
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
