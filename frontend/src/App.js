import { useEffect, useState } from 'react';
import './App.css';
import MessageList from './components/MessageList';
import { apiUrl } from './utils';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(apiUrl + 'users/1');
      setUser(await response.json());
    };
    getData();
  }, []);

  console.log(user)

  return (
    <div className="App">
      <MessageList user={user}/>
    </div>
  );
}

export default App;
