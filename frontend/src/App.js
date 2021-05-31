import { useState } from 'react';
import './App.css';
import MessageList from './components/MessageList';
import SignIn from './components/SignIn';
import MessageForm from './components/MessageForm';

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null)

  return (
    <div className="App">
      <h1>{user ? user.username : ''}</h1>
      <h2>{token}</h2>
      <MessageList user={user} />
      <SignIn setUser={setUser} setToken={setToken} />
      <MessageForm user={user} />
    </div>
  );
}

export default App;
