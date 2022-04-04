const BaseError = require('../lib/BaseError');
const User = require('../models/User');

async function getAllUsers (req, res, next) {
    try {
        let users = [];
        if(req.query.query) {
            let query = (""+req.query.query).toLowerCase();
            users = await User.getUsersByQuery(query);
        }
        else {
            users = await User.getAllUsers();
        }
        res.json(users);
    }
    catch(err) {
        next(err);
    }
}

module.exports = getAllUsers;