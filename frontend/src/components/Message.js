import {
  Box,
  Paper,
  Typography
} from '@material-ui/core';

const Message = ({ message }) => {
  return (
    <Box>
      <Paper>
        <Typography variant='h1'>{message.title}</Typography>
        <Typography variant='h2'>From: {message.sender_id}</Typography>
        <Typography variant='body1'>{message.body}</Typography>
      </Paper>
    </Box>
  )
}

export default Message;
