const BaseError = require('../lib/BaseError');
const User = require('../models/User');

async function updateUser(req, res, next) {
    try {
        let user = await User.getUserById(req.params.id);
        if(user.length > 0) {
            let name = req.body.name ?? null;
            let phone = req.body.phone ?? null;
            let age = req.body.age ?? null;
            let city = req.body.city ?? null;
            let address = req.body.address ?? null;
            if(name || phone || age || city || address) {
                let is_updated = await User.updateUserById(req.params.id, name, phone, age, city, address);
                if(is_updated) {
                    let new_user = await User.getUserById(req.params.id);
                    res.json(new_user[0]);
                } 
            }
            else {
                throw new BaseError(400, true, 'Incorrect parameter passed');
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

module.exports = updateUser;