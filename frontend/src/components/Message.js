import {
  Box,
  Paper,
  Typography
} from '@material-ui/core';

const Message = ({ message }) => {
  console.log(message);
  return (
    <Box>
      <Paper>
        <Typography variant='h1'>Message</Typography>
        <Typography variant='h1'>Message</Typography>
        <Typography variant='h1'>Message</Typography>
        <Typography variant='h1'>Message</Typography>
      </Paper>
    </Box>
  )
}

export default Message;
