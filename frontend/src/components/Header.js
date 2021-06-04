import {
  AppBar,
  makeStyles,
  Toolbar,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles({
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

const Header = ({ user }) => {
  const classes = useStyles();

  return (
    <AppBar position='static'>
      <Toolbar className={classes.toolbar}>
        <Typography
          variant='h1'
        >
          Open When
        </Typography>
        <Typography
          variant='h2'
        >
          {user ? user.username : null}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header;
