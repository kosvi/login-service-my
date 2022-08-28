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

  return (
    <div>
      code: {code}
      state: {state}
    </div>
  );
}

export default Callback;
