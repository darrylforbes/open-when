import logo from './logo.svg';
import './App.css';
import MessageList from './components/MessageList';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <MessageList text="testing"/>
      </header>
    </div>
  );
}

export default App;
