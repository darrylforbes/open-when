import {
  Button,
  makeStyles,
  Paper,
  Typography
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  body: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(8),
    marginTop: theme.spacing(2)
  }
}));

const Message = ({ message }) => {
  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.paper}>
        <div>
          <Typography variant='h1'>{message.title}</Typography>
          <Typography variant='h2'>From: {message.sender_id}</Typography>
        </div>
        <Typography
          className={classes.body}
          variant='body1'
        >
          {message.body}
        </Typography>
        <Button
          variant='contained'
          color='secondary'
          component={ Link }
          to='/'
        >
          Close
        </Button>
      </Paper>
    </div>
  )
}

export default Message;
