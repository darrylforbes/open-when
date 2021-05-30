import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Typography
} from '@material-ui/core';
import { apiUrl } from '../utils';

const MessageList = ({ user }) => {
  return (
    <Container>
      <Typography variant='h1'>Message List</Typography>
      <Box>
        {user && user.received_messages.map((m, index) => (
          <Card key={index}>
            <CardActionArea href={apiUrl + 'messages/' + m.id}>
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
    </Container>
  )
}

export default MessageList;
