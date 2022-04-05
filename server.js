const http = require('http');
const app = require('./app');
const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || 'localhost';

const {listenUncaughtError} = require('./middlewares/ErrorHandler');

const server = http.createServer(app);

listenUncaughtError(server);

server.listen(PORT, () => {
    console.log(`Server running on ${HOST}:${PORT}`);
});