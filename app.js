const express = require('express');
const cors = require('cors');
const app = express();

const {handleError} = require('./middlewares/ErrorHandler');

const apiRouter = require('./routes/apiRouter');
const BaseError = require('./lib/BaseError');

//app configurations
app.use(cors({
    origin: `http://${process.env.HOST}`
}));
app.use(express.json());

// routers configurations
app.use("/api", apiRouter);
app.all("*", (req, res, next) => next(new BaseError(404, true, 'Not found')));
app.use(handleError);

module.exports = app;