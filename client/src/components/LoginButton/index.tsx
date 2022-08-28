import React, { useContext, useState } from 'react';
import { UserContext } from '../../state';
// import { createHash, randomBytes } from 'crypto';

function Redirecter({ url }: { url: string }) {
  window.location.replace(url);
  return (
    <div>
      {url}
    </div>
  );
}

function LoginButton() {

  const [, setUser] = useContext(UserContext);
  const [redirect, setRedirect] = useState<boolean>(false);

  // https://dropbox.tech/developers/pkce--what-and-why-
  //const base64Encode = (str: Buffer): string => {
  //return str.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  //};

  const clientId = '87aff961-3b64-4089-997c-9a4d889d8114&';
  const resourceId = '2c09b248-fbef-4c27-a192-e9f91ca6bd51';
  const redirectUri = 'http%3A%2F%2Flocalhost%3A5000%2Fcallback';
  // const codeVerifier = base64Encode(randomBytes(32));
  // const codeChallenge = base64Encode(createHash('sha256').update(codeVerifier).digest());
  const codeVerifier = 'MkAVLwa0SWfmWIwAhwHUeQY0R5aMmMUN3aP_yz-EZNk';
  const codeChallenge = 'xZNungXGej8ni4gNtLRbHZeQsv-qxuF3nYfkDs9zYz8';
  const state = 'some-very-long-random-string';


  const requestUrl = `http://localhost:3000/?response_type=code&client_id=${clientId}&state=${state}&redirect_uri=${redirectUri}&resource=${resourceId}&code_challenge=${codeChallenge}&code_challenge_method=S256`;

  const requestCode = () => {
    console.log('foobar');
    setRedirect(true);
  };

  if (redirect) {
    return <Redirecter url={requestUrl} />;
  }

  return (
    <div onClick={requestCode}>
      LoginButton
    </div>
  );
}

export default LoginButton;
