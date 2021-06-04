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
  Link,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { apiUrl } from '../utils';
import Message from './Message';

const MessageList = ({ user, token }) => {
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
    <Switch>
      <Route exact path='/'>
        <Box>
          <Typography variant='h1'>Open when...</Typography>
          <Button
            variant='contained'
            color='primary'
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
                  to={`/${user.username}/messages/${m.id}`}
                >
                  <CardContent>
                    <Typography variant='h2'>{m.title}</Typography>
                    <Typography variant='h3'>From: {m.sender_id}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        </Box>
        {!token ? <Redirect to='/signin' /> : null}
      </Route>

      {/* Routes for messages */}
      {messages.map((m, index) => (
        <Route path={`/${user.username}/messages/${m.id}`} key={index}>
          <Message message={m} />
          {!token ? <Redirect to='/signin' /> : null}
        </Route>
      ))}
    </Switch>
  )
}

export default MessageList;
