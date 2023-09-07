import cluster from 'node:cluster';
import http from 'node:http';
import router from "./routes/userRoutes";
// import { UserData } from './userTypes/userType';

import { InMemoryDB } from "./models/db";

const startWorkers = (): void => {
    // Worker processes
    const port = 8000 + Number(cluster.worker?.id);

    const server = http.createServer((req, res) => {
        router(req, res, new InMemoryDB());
    });
    
    server.listen(port, () => {
        console.log(`Worker ${Number(cluster.worker?.id)} listening on port ${port}`);
    });
}

export default startWorkers;
