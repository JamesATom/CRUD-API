import http from 'node:http';
import router from '../routes/userRoutes';

import InMemoryDB from '../models/db';

const instanceDB = new InMemoryDB();    

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
    router(req, res, instanceDB);
});

export default server;