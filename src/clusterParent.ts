import cluster from "node:cluster";
import os from 'node:os';
import process from 'node:process';
import * as dotenv from 'dotenv';
import createLoadBalancer  from "./loadBalancer";
import startWorkers from './clusterWorker';

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
} else {
    startWorkers();
}

console.log(`Server with ${numCPUs} workers running`);

    
