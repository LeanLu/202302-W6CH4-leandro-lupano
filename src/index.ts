import http from 'http';
import url, { URLSearchParams } from 'url';

// TEMPORAL: const PORT = process.env.PORT || 3200;

import { program } from 'commander';

let PORT = 3600;

const portFunction = () => {
  program.option('-p, --port <char>');

  program.parse();

  const options = program.opts();

  if (options.port) {
    console.log('Port chosen: ' + options.port);
    PORT = options.port;
  }
};

portFunction();

const server = http.createServer((request, response) => {
  if (!request.url) {
    server.emit('error', new Error('Invalid url'));
    return;
  }

  if (request.method !== 'GET') {
    response.write('This method is not available');
    return;
  }

  const { pathname, search } = url.parse(request.url);

  if (pathname !== '/calculator') {
    server.emit('error', new Error('Invalid url'));
    return;
  }

  const urlParams = new URLSearchParams(search!);

  const a = Number(urlParams.get('a'));
  const b = Number(urlParams.get('b'));

  if (!a || !b) {
    server.emit('error', new Error('Invalid url'));
  }

  const sum = a + b;
  const rest = a - b;
  const multiply = a * b;
  const div = a / b;

  response.writeHead(200, { 'Content-Type': 'text/html' });

  response.write(
    `
    <html>
            <head>
              <title>Calculator</title>
              <link rel="shortcut icon" href="#">
            </head>
            <body>
              <h1>Calculator Result</h1>
              <p>${a} + ${b} = ${sum}</p>
              <p>${a} - ${b} = ${rest}</p>
              <p>${a} * ${b} = ${multiply}</p>
              <p>${a} / ${b} = ${div}</p>
            </body>
          </html>
    `
  );

  response.end();
});

server.on('listening', () =>
  console.log(`Listening in http://localhost:${PORT}/calculator?a=3&b=6`)
);

server.listen(PORT);
