const BaseError = require('../lib/BaseError');
const User = require('../models/User');

async function addNewUser(req, res, next) {
    try {
        let new_user = req.body || {};
        if(User.checkUserProps(new_user)) {
            let {name, phone, age, city, address} = new_user;
            let id = await User.insertNewUser(name, phone, age, city, address);
            new_user[User.USER_PROPS['col_id']] = id;

            res.status(201).json(new_user);
        }
        else {
            next(new BaseError(400, true, 'Incorrect parameter passed'));
        }
    }
    catch(err) {
        next(err);
    }
}

module.exports = addNewUser;