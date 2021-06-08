import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  makeStyles,
  useMediaQuery
} from '@material-ui/core';
import {
  Link,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { apiUrl } from '../utils';
import Message from './Message';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing()
  },
  card: {
    margin: theme.spacing(),
    width: '100%'
  }
  // TODO: change color of card based on its lock/read status
  // lockedCard: {
  // },
  // readCard: {
  // },
  // unlockedCard: {
  // },
}));

const MessageList = ({ user, token }) => {
  const [messages, setMessages] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const classes = useStyles();

  const matches = useMediaQuery(theme => theme.breakpoints.down('sm'))

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
        <Box margin={4}>
          <Box
            alignItems='center'
            display='flex'
            justifyContent='space-between'
          >
            <Typography variant='h1'>Open when...</Typography>
            <div>
              <Button
                variant='contained'
                className={classes.button}
                color='primary'
                component={ Link }
                to='/message'
              >
                New Message
              </Button>
              <Button
                variant='contained'
                className={classes.button}
                onClick={() => setIsRefreshing(true)}
              >
                Refresh
              </Button>
            </div>
          </Box>
          <Box display='flex' flexWrap='wrap'>
            {messages.map((m, index) => (
              <Card className={classes.card} key={index}>
                <CardActionArea
                  component={ Link }
                  to={`/${user.username}/messages/${m.id}`}
                >
                  <CardContent>
                    <Typography noWrap variant='h2'>{m.title}</Typography>
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
