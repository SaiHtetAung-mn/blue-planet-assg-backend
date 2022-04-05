const { query } = require('express');
const db_connection = require('./Database');

const USER_PROPS = {
    table: 'User',
    col_id: 'id',
    col_name: 'name',
    col_phone: 'phone',
    col_age: 'age',
    col_city: 'city',
    col_address: 'address'
}

function checkUserProps(user) {
    if(!user instanceof Object) {
        return false;
    }
    else if(!Number.isInteger(user.age)) {
        return false;
    }
    else {
        let is_all_props = Boolean(user.name) && Boolean(user.phone) && 
            Boolean(user.age) && Boolean(user.city) && Boolean(user.address);

        if(is_all_props) {
            return true;
        }
        else {
            return false;
        }
    }
}

function getAllUsers() {
    return new Promise((resolve, reject) => {
        const query = `select * from ${USER_PROPS['table']}`;
        db_connection.query(query, (err, result) => {
            if(err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        })
    })
}

function getUsersByQuery(queryName) {
    return new Promise((resolve, reject) => {
        const query = `select * from ${USER_PROPS['table']} where LOWER(${USER_PROPS['col_name']}) LIKE '%${queryName}%'`;
        db_connection.query(query, (err, result) => {
            if(err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        })
    })
}

function getUserById(id) {
    return new Promise((resolve, reject) => {
        const query = `select * from ${USER_PROPS['table']} where ${USER_PROPS['col_id']}="${id}"`;
        db_connection.query(query, (err, result) => {
            if(err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        })
    })
}

function insertNewUser(name, phone, age, city, address) {
    return new Promise((resolve, reject) => {
        const new_id = Date.now().toString();
        const query = `insert into ${USER_PROPS['table']} values("${new_id}", "${name}",
         "${phone}", "${age}", "${city}", "${address}")`;
        db_connection.query(query, err => {
            if(err) {
                reject(err);
            }
            else {
                resolve(new_id);
            }
        })
    })
}

function updateUserById(_id, _name, _phone, _age, _city, _address) {
    return new Promise((resolve, reject) => {
        let name = _name == null ? '' : `${USER_PROPS['col_name']}="${_name}",`;
        let phone = _phone == null ? '' : `${USER_PROPS['col_phone']}="${_phone}",`;
        let age = _age == null ? '' : `${USER_PROPS['col_age']}="${_age}",`;
        let city = _city == null ? '' : `${USER_PROPS['col_city']}="${_city}",`;
        let address = _address == null ? '' : `${USER_PROPS['col_address']}="${_address}",`;

        let query = `update ${USER_PROPS['table']} set ${name}${phone}${age}${city}${address}`;
        query = query.trim();
        query = query.substring(0, query.length-1); //delete last comma
        query += ` where ${USER_PROPS['col_id']}="${_id}"`;

        db_connection.query(query, (err) => {
            if(err) {
                reject(err);
            }
            else {
                resolve(true);
            }
        })
    })
}

function deleteUserById(id) {
    return new Promise((resolve, reject) => {
        let query = `delete from ${USER_PROPS['table']} where id="${id}"`;
        db_connection.query(query, err => {
            if(err) {
                reject(err);
            }
            else {
                resolve(true);
            }
        })
    })
}

module.exports = {
    getAllUsers, 
    checkUserProps, 
    insertNewUser, 
    getUserById, 
    getUsersByQuery,
    updateUserById, 
    deleteUserById, 
    USER_PROPS
};