import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Typography
} from '@material-ui/core';
import {
  BrowserRouter as Router,
  Link,
  Route
} from 'react-router-dom';
import { apiUrl } from '../utils';
import Message from './Message';

const MessageList = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const getMessages = async () => {
      if (user) {
        const response = await fetch(`${apiUrl}/users/${user.id}/inbox`);
        if (response.status === 200) {
          setMessages(await response.json());
          setIsRefreshing(false);
        } else {
          console.log(response.status);
        }
      };
    }
    getMessages();
  }, [user, isRefreshing])

  return (
    <Box>
      <Typography variant='h1'>Message List</Typography>
      <Button
        variant='contained'
        component={ Link }
        to='/message'
      >
        New Message
      </Button>
      <Button
        variant='contained'
        onClick={() => setIsRefreshing(true)}
      >
        Refresh
      </Button>
      <Box>
        {messages.map((m, index) => (
          <Card key={index}>
            <CardActionArea
              component={ Link }
              to={`/${user.username}/${m.id}`}
            >
              <CardContent>
                <Typography variant='h2'>{m.title}</Typography>
                <Typography variant='h3'>Sender: {m.sender_id}</Typography>
                <Typography variant='h4'>{m.body}</Typography>
                <Typography variant='h4'>{m.id}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
      <Router>
        {messages.map((m, index) => (
          <Route path={`/${user.username}/${m.id}`} key={index}>
            <Message message={m} />
          </Route>
        ))}
      </Router>
    </Box>
  )
}

export default MessageList;
