import React, { useEffect, useState } from 'react';

function Callback() {

  const [code, setCode] = useState<string>('');
  const [state, setState] = useState<string>('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const codeParam = params.get('code');
    const stateParam = params.get('state');
    if (codeParam) setCode(codeParam);
    if (stateParam) setState(stateParam);
  }, []);

  const getToken = async () => {
    const response = await fetch('http://localhost:4500/api/test', {
      method: 'POST',
      body: JSON.stringify({
        code: code,
        state: state
      })
    })
    const responseJson = await response.json();
    console.info(responseJson);
  }

  return (
    <div>
      code: {code}
      state: {state}
      <br />
      <span onClick={getToken}>Show in console</span>
    </div>
  );
}

export default Callback;
