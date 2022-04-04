const express = require('express');
const cors = require('cors');
const app = express();

//app configurations
app.use(cors({
    origin: `http://${process.env.HOST}`
}));

module.exports = app;