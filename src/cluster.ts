import cluster from "node:cluster";
import http from 'node:http';
import os from 'node:os';
import process from 'node:process';
import router from "./routes/userRoutes";
import * as dotenv from 'dotenv';

dotenv.config();

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    
    // server.listen(port, () => {
    //     console.log(`Load balancer is listening on port ${port}`);
    //   });
    
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    // Worker processes
    const port = 8000 + Number(cluster.worker?.id);

    const server = http.createServer((req, res) => {
        router(req, res);
    });
    
    server.listen(port, () => {
        console.log(`Worker ${Number(cluster.worker?.id)} listening on port ${port}`);
    });
    console.log('\n');
}

console.log(`Server with ${numCPUs} workers running`);
