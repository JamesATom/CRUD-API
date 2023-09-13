import http from 'node:http';
import { REG_UUID } from '../regex/regex';

const router = (req: http.IncomingMessage, res: http.ServerResponse, UserDB: any) => {
    const { method, url } = req;
    const splitUrl: string | undefined = url?.split('/')[3];
    
    if (method === 'GET') {
        if (url === '/api/users') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify({ message: UserDB.getUsers() }));
            res.end();
        } else if (REG_UUID.test(splitUrl || '') && splitUrl) {
            const user = UserDB.getUser(splitUrl);
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
                const user = { id: '', username, age, hobbies };
                const newUser = UserDB.addUser(user);
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.write(JSON.stringify({ message: newUser }));
                res.end();
                process.send?.({ type: 'db', action: 'POST', data: newUser });
            });
        }
    } else if (method === 'PUT') {
        if (REG_UUID.test(splitUrl || '') && splitUrl) {
            const user = UserDB.getUser(splitUrl);
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
                    const updatedUser = UserDB.updateUser(splitUrl, 
                        { 
                            id: splitUrl, 
                            username, 
                            age, 
                            hobbies 
                        });
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.write(JSON.stringify({ message: updatedUser }));
                    res.end();
                    process.send?.({ type: 'db', action: 'PUT', data: updatedUser });
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
            const user = UserDB.deleteUser(splitUrl);
            if (user) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.write(JSON.stringify({ message: 'User deleted' }));
                res.end();
                process.send?.({ type: 'db', action: 'DELETE', data: user });
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
