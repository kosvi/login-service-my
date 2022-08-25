import React, { useContext } from 'react';
import './App.css';
import LoginButton from './components/LoginButton';
import Callback from './routes/Callback';
import { UserContext } from './state';

function App() {

  const [user] = useContext(UserContext);

  if (window.location.href.includes('/callback?code')) {
    return (
      <Callback />
    );
  }

  return (
    <div>
      {!user && <LoginButton />}
      {user && `Hello ${user?.username}!`}
    </div>
  );
}

export default App;
