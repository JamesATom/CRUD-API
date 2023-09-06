import server from "./httpServer/server";
import * as dotenv from 'dotenv';
dotenv.config();
server.listen(process.env.PORT, () => {
    console.log('Server is listening on port: ', process.env.PORT);
});
