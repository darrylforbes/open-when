import {
  Box,
  Button,
  Paper,
  Typography
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const Message = ({ message }) => {
  return (
    <Box>
      <Paper>
        <Typography variant='h1'>{message.title}</Typography>
        <Typography variant='h2'>From: {message.sender_id}</Typography>
        <Typography variant='body1'>{message.body}</Typography>
        <Button
          variant='contained'
          component={ Link }
          to='/'
        >
          Close
        </Button>
      </Paper>
    </Box>
  )
}

export default Message;
