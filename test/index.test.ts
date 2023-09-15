import http from 'http';

let id: string;
const PORT = 8000;
const baseUrl = `http://localhost:${PORT}`;
const newUser = {
    username: 'Alex',
    age: 29,
    hobbies: ['coding', 'gaming'],
};

describe('Simple CRUD API tests', () => {
    
    it('should return 200 OK and Empty array when fetching all users', (done) => {
        http.get(`${baseUrl}/api/users`, (res) => {
            // arrange
            let data = '';
            // act
            res.on('data', (chunk) => {
                data += chunk;
            });
            // assert
            res.on('end', () => {
                expect(res.statusCode).toEqual(200);
                expect(JSON.parse(data).message).toEqual([]);
                done();
            });
        });
    });

    it('should return 201 OK and the new user when adding a new user', (done) => {
        // arrange
        const req = http.request(`${baseUrl}/api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }, (res) => {
            // arrange
            let data = '';
            // act
            res.on('data', (chunk) => {
                data += chunk;
            });
            // assert
            res.on('end', () => {
                expect(res.statusCode).toEqual(201);
                id = JSON.parse(data).message.id;
                expect(JSON.parse(data).message).toStrictEqual(Object.assign(newUser, { id: expect.any(String) }));
                done();
            });
        });
        // act
        req.write(JSON.stringify(newUser));
        req.end();
    });

    it('should return 200 OK and the user when fetching a user by ID', (done) => {
        // arrange
        const req = http.request(`${baseUrl}/api/users/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }, (res) => {
            // arrange
            let data = '';
            // act
            res.on('data', (chunk) => {
                data += chunk;
            });
            // assert
            res.on('end', () => {
                expect(res.statusCode).toEqual(200);
                expect(JSON.parse(data).message).toStrictEqual(Object.assign(newUser, { id }));
                done();
            });
        });
        // act
        req.end();
    });

    it('should return 200 OK and the updated user when updating a user by ID', (done) => {
        // arrange
        const req = http.request(`${baseUrl}/api/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        }, (res) => {
            // arrange
            let data = '';
            // act
            res.on('data', (chunk) => {
                data += chunk;
            });
            // assert
            res.on('end', () => {
                expect(res.statusCode).toEqual(200);
                expect(JSON.parse(data).message).toStrictEqual(Object.assign(newUser, { id }));
                done();
            });
        });
        // act
        req.write(JSON.stringify(newUser));
        req.end();
    });

    it('should return 204 OK when deleting a user by ID', (done) => {
        // arrange
        const req = http.request(`${baseUrl}/api/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }, (res) => {
            // assert
            expect(res.statusCode).toEqual(204);
            done();
        });
        // act
        req.end();
    });

    it('should return 404 OK when fetching a user by ID', (done) => {
        // arrange
        const req = http.request(`${baseUrl}/api/users/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }, (res) => {
            // arrange
            let data = '';
            // act
            res.on('data', (chunk) => {
                data += chunk;
            });
            // assert
            res.on('end', () => {
                expect(res.statusCode).toEqual(404);
                expect(JSON.parse(data).message).toEqual('User not found');
                done();
            });
        });
        // act
        req.end();
    });
});