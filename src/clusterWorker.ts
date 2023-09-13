import cluster, { Worker } from 'node:cluster';
import http from 'node:http';
import router from "./routes/userRoutes";

const startWorkers = (UserDB: any): void => {
    // Worker processes
    const port = 8000 + Number(cluster.worker?.id);

    const server = http.createServer((req, res) => {
        router(req, res, UserDB);
    });
    
    server.listen(port, () => {
        console.log(`Worker ${Number(cluster.worker?.id)} listening on port ${port}`);
    });
}

export default startWorkers;
