import {
  Box,
  Button,
  Backdrop,
  makeStyles,
  Paper,
  Typography
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  paper: {
    padding: 50
  }
});

const Message = ({ message }) => {
  const classes = useStyles();

  return (
    <Box>
      <Backdrop open={true}>
        <Paper className={classes.paper}>
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
      </Backdrop>
    </Box>
  )
}

export default Message;
