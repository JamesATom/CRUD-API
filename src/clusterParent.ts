import cluster, { Worker } from "node:cluster";
import os from 'node:os';
import process from 'node:process';
import * as dotenv from 'dotenv';
import createLoadBalancer  from "./loadBalancer";
import startWorkers from './clusterWorker';
import InMemoryDB from './models/db';

dotenv.config();
const numCPUs = os.cpus().length;
const workers: any[] = [];

if (cluster.isPrimary) {
    console.log(`Master ${process.pid} is running`);
    
    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
        const worker = cluster.fork();
        workers.push(worker);
    }
    
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork();
    });

    createLoadBalancer(numCPUs, workers);

    cluster.on('message', (worker, message) => {
        if (message.type === 'db') {
            console.log(`Master received db update message from worker ${worker.id}`);
            workers.forEach((otherWorker) => {
                if (otherWorker?.id !== worker.id) {
                    otherWorker?.send(message);
                }
            });
        }
    });

} else {
    const UserDB = new InMemoryDB();
    process.on('message', (message: any) => {
        if (message.type === 'db') {
            switch (message.action) {
                case 'POST':
                    UserDB.addUser(message.data);
                    break;
                case 'PUT':
                    UserDB.updateUser(message.data.id, message.data);
                    break;
                case 'DELETE':
                    UserDB.deleteUser(message.data.id);
                    break;
                default:
                    break;
            }
        }
    });

    startWorkers(UserDB);
}

console.log(`Server with ${numCPUs} workers running`);

    
