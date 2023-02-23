/* eslint-disable no-unused-vars */
import http from 'http';
import url from 'url';
import * as dotenv from 'dotenv';
import { addKnowledge, getAllKnowledge } from './functions.js';

dotenv.config();

const PORT = process.env.PORT || 3200;

const serverApi = http.createServer((request, response) => {
  switch (request.method) {
    case 'GET':
      response.write('GET');
      break;

    case 'POST':
      response.write('Post');
      break;

    case 'PATCH':
      response.write('Patch');
      break;

    case 'DELETE':
      response.write('Delete');
      break;

    default:
      break;
  }

  response.end();
});

serverApi.on('listening', () => console.log(PORT));

serverApi.listen(PORT);
