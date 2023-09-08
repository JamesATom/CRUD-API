import { User, UserData } from "../userTypes/userType";

import crypto from 'node:crypto';

export default class InMemoryDB implements UserData {
    private db: User[] = [];

    constructor() {
        this.db = [];
    }

    public addUser(user: any): User {
        const newUser: User = {
            id: crypto.randomUUID(),
            username: user.username,
            age: user.age,
            hobbies: user.hobbies
        };
        this.db.push(newUser);
        return newUser;
    }

    public getUsers(): User[] {
        return this.db;
    }

    public getUser(id: string): User | undefined {
        return this.db.find((user) => user.id === id);
    }

    public updateUser(id: string, user: User): User | undefined {
        const userIndex = this.db.findIndex((user) => user.id === id);
        if (userIndex !== -1) {
            this.db[userIndex] = {
                id: user.id,
                username: user.username,
                age: user.age,
                hobbies: user.hobbies
            };
            return this.db[userIndex];
        }
        return undefined;
    }

    public deleteUser(id: string): User | undefined {
        const userIndex = this.db.findIndex((user) => user.id === id);
        if (userIndex !== -1) {
            const deletedUser = this.db[userIndex];
            this.db.splice(userIndex, 1);
            return deletedUser;
        }
        return undefined;
    }
}