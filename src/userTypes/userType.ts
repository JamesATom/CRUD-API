export type User = {
    id: string;
    username: string;
    age: number;
    hobbies: string[];
}

export interface UserData {
    addUser(user: User): User;
    getUsers(): User[];
    getUser(id: string): User | undefined;
    updateUser(id: string, user: User): User | undefined;
    deleteUser(id: string): User | undefined;
}