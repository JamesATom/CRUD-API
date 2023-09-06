import http from 'http';

const PORT = 8000;

const createLoadBalancer = (numWorkers: number, workers: any[]): void => {
    console.log('Creating load balancer');
    
    // Keep track of the last used worker ID
    let currentWorker = 0;

    // Create HTTP server for load balancer
    const server = http.createServer((req, res) => {
        // Distribute requests among worker processes using Round-robin algorithm
        const worker = workers[currentWorker];
        currentWorker++;
        if (currentWorker >= numWorkers) {
            currentWorker = 0;
        }

        if (worker) {
            console.log(`Load balancer distributing request to Worker ${worker.id}`);
            const proxy = http.request({
                    host: worker.process.host,
                    port: PORT + parseInt(worker.id),
                    path: req.url,
                    method: req.method,
                    headers: req.headers
                }, (proxyResp) => {
                    res.writeHead(proxyResp.statusCode || 302, proxyResp.headers);
                    proxyResp.pipe(res, { end: true });
                }
            );
            req.pipe(proxy, { end: true });
        } else {
            res.writeHead(503);
            res.end('Application temporarily unavailable');
        }
    });

  // Listen for incoming requests on port PORT
    server.listen(PORT, () => {
        console.log('Load balancer listening on port ' + PORT);
    });
};

export default createLoadBalancer;