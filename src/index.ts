import { createServer as HttpCreateServer, IncomingMessage, ServerResponse } from 'http';
const PORT = 4500;

const app = (_request: IncomingMessage, response: ServerResponse) => {
  response
    .setHeader('Content-Type', 'text/html')
    .writeHead(200)
    .end('Hello!');
};

const server = HttpCreateServer(app);

const start = () => {
  server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};

start();
