import {
  AppBar,
  Toolbar,
  Typography
} from '@material-ui/core';

const Header = ({ user }) => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h1'>Open When</Typography>
        <Typography variant='h2'>{user ? user.username : null}</Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header;
