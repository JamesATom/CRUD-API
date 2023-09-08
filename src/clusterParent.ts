import cluster, { Worker } from "node:cluster";
import os from 'node:os';
import process from 'node:process';
import * as dotenv from 'dotenv';
import createLoadBalancer  from "./loadBalancer";
import startWorkers from './clusterWorker';

dotenv.config();
const numCPUs = os.cpus().length;
const workers: any[] = [];
let sharedMemory: any;

if (cluster.isPrimary) {
    console.log(`Master ${process.pid} is running`);
    
    sharedMemory = new SharedArrayBuffer(1024);
    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
        const worker = cluster.fork();
        workers.push(worker);
        worker.send({ sharedMemory });
    }
    
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork();
    });

    

    createLoadBalancer(numCPUs, workers);
} else {
    process.on('message', (message: any) => {
        sharedMemory = message.sharedMemory;
        startWorkers(sharedMemory);
    });
    
}

console.log(`Server with ${numCPUs} workers running`);

    
