const express = require('express');

const getAllUsers = require('../controllers/getAllUsers');
const addNewUser = require('../controllers/addNewUsers');
const updateUser = require('../controllers/updateUser');
const deleteUser = require('../controllers/deleteUser');

const apiRouter = express.Router();

apiRouter
.get("/users", getAllUsers)
.post("/users", addNewUser)
.patch("/users/:id", updateUser)
.delete("/users/:id", deleteUser);

module.exports = apiRouter;