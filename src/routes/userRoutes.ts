import http from 'node:http';
import { UserDB } from '../models/db';
import { REG_ENDPOINT_BASE, anythingAfterUsers } from '../regex/regex';

const router = (req: http.IncomingMessage, res: http.ServerResponse) => {
    const { method, url } = req;
    const splitUrl: string | undefined = url?.split('/')[3];
    const fullUrl = `http://localhost:8000${url}`;
    
    if (method === 'GET') {
        if (url === '/api/users') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify({ message: UserDB }));
            res.end();
        } else if (splitUrl) {
            const user = UserDB.find((user) => user.id === splitUrl);
            if (user) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.write(JSON.stringify({ message: user }));
                res.end();
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.write(JSON.stringify({ message: 'User not found' }));
                res.end();
            }
        } else {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify({ message: 'Invalid UserID' }));
            res.end();
        }
    } else if (method === 'POST') {

    }
}

export default router;
