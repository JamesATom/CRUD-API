import http from 'node:http';
import router from '../routes/userRoutes';

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
    router(req, res);
});

export default server;