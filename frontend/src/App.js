import { useState } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { Container, CssBaseline } from '@material-ui/core';
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider
} from '@material-ui/core/styles';
import './App.css';
import Header from './components/Header';
import MessageForm from './components/MessageForm';
import MessageList from './components/MessageList';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

let theme = createMuiTheme({
  palette: {
    background: {
      default: '#f7f7f7'
    },
    primary: {
      main: '#a6d4fa'
    },
    secondary: {
      main: '#f6a5c0'
    },
    error: {
      main: '#e57373'
    },
    warning: {
      main: '#ffb74d'
    },
    info: {
      main: '#64b5f6'
    },
    success: {
      main: '#81c784'
    }
  }
});
theme = responsiveFontSizes(theme);

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null)

  console.log(token);

  // TODO: Use react router <Redirect /> to force login when no token
  // TODO: Update backend to require authentication then pass token

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header user={user} />
        <Container>
          <Switch>
            <Route path='/signin'>
              <SignIn setUser={setUser} setToken={setToken} />
              {token ? <Redirect to='/' /> : null}
            </Route>
            <Route path='/signup'>
              <SignUp setUser={setUser} setToken={setToken} />
              {token ? <Redirect to='/' /> : null}
            </Route>
            <Route path='/message'>
              <MessageForm user={user} />
              {!token ? <Redirect to='/signin' /> : null}
            </Route>
            <Route path='/'>
              <MessageList user={user} token={token} />
              {!token ? <Redirect to='/signin' /> : null}
            </Route>
          </Switch>
        </Container>
      </ThemeProvider>
    </Router>
  );
}

export default App;
