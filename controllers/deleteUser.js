const BaseError = require('../lib/BaseError');
const User = require('../models/User');

async function deleteUser(req, res, next) {
    try {
        let user = await User.getUserById(req.params.id);
        if(user.length > 0) {
            let is_deleted = await User.deleteUserById(req.params.id);
            if(is_deleted) {
                res.status(204).end();
            }
        }
        else {
            throw new BaseError(400, true, `No user exists with id=${req.params.id}`);
        }
    }
    catch(err) {
        next(err);
    }
}

module.exports = deleteUser;