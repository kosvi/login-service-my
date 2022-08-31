import { createServer as HttpCreateServer, IncomingMessage, ServerResponse } from 'http';
import axios from 'axios';
const PORT = 4500;

const app = (request: IncomingMessage, response: ServerResponse): void => {
  void (async () => {
      response.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000');
      response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
      response.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    if (request.method === 'POST' && request.url?.startsWith('/api/test')) {
      const body = await new Promise((res, rej) => {
        try {
          let content = '';
          request.on('data', (chunk) => {
            content += chunk;
          });
          request.on('end', () => {
            res(content);
          });
        } catch (error) {
          rej((error as Error).message);
        }
      });
      const { code, state } = JSON.parse(body as string) as { code: string, state: string };
      if (code && state) {
        const codeResponse = await axios.post('http://localhost:3001/token', JSON.stringify({
            grant_type: 'authorization_code',
            code: code,
            client_id: '87aff961-3b64-4089-997c-9a4d889d8114',
            code_verifier: 'MkAVLwa0SWfmWIwAhwHUeQY0R5aMmMUN3aP_yz-EZNk',
            redirect_uri: 'http%3A%2F%2Flocalhost%3A5000%2Fcallback'
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Host': 'auth.5v.fi'
          }
        });
        return response.setHeader('Content-Type', 'application/json')
          .writeHead(200)
          .end(JSON.stringify(codeResponse.data));
      } else {
        return response.setHeader('Content-Type', 'application/json')
          .writeHead(400)
          .end(body);
      }
    }
    return response
      .setHeader('Content-Type', 'text/html')
      .writeHead(200)
      .end('Hello!');
  })();
};

const server = HttpCreateServer(app);

const start = () => {
  server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};

start();
