import http from 'node:http';
import { UserDB } from '../models/db';
import { REG_UUID } from '../regex/regex';
import crypto from 'node:crypto';

const router = (req: http.IncomingMessage, res: http.ServerResponse) => {
    const { method, url } = req;
    const splitUrl: string | undefined = url?.split('/')[3];
    
    if (method === 'GET') {
        if (url === '/api/users') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify({ message: UserDB }));
            res.end();
        } else if (REG_UUID.test(splitUrl || '') && splitUrl) {
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
        if (url === '/api/users') {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            });
            req.on('end', () => {
                const { username, age, hobbies } = JSON.parse(body);
                if (!username || !age || !hobbies) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.write(JSON.stringify({ message: 'Invalid request' }));
                    res.end();
                    return;
                }
                const newUser = {
                    id: crypto.randomUUID(),
                    username,
                    age,
                    hobbies
                };
                UserDB.push(newUser);
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.write(JSON.stringify({ message: newUser }));
                res.end();
            });
        }
    } else if (method === 'PUT') {
        if (REG_UUID.test(splitUrl || '') && splitUrl) {
            const user = UserDB.find((user) => user.id === splitUrl);
            if (user) {
                let body = '';
                req.on('data', (chunk) => {
                    body += chunk.toString();
                });
                req.on('end', () => {
                    const { username, age, hobbies } = JSON.parse(body);
                    if (!username || !age || !hobbies) {
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        res.write(JSON.stringify({ message: 'Invalid request' }));
                        res.end();
                        return;
                    }
                    user.username = username;
                    user.age = age; 
                    user.hobbies = hobbies;
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.write(JSON.stringify({ message: user }));
                    res.end();
                });
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
    } else if (method === 'DELETE') {
        if (REG_UUID.test(splitUrl || '') && splitUrl) {
            const user = UserDB.find((user) => user.id === splitUrl);
            if (user) {
                const index = UserDB.indexOf(user);
                UserDB.splice(index, 1);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.write(JSON.stringify({ message: 'User deleted' }));
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
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ message: 'Route not found' }));
        res.end();
    }
}

export default router;
