const http = require('http');
const app = require('./app');
const PORT = process.env.PORT;
const HOST = process.env.HOST;

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server running on ${HOST}`);
});