import React, { useState } from 'react';
import './App.css';
import { UserInfo } from './types/internal';

function App() {

  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);

  return (
    <div>
      Hello!
    </div>
  );
}

export default App;
