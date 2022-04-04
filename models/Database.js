const mysql = require('mysql');

const options = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bp_assg'
}

const connection = mysql.createConnection(options);

connection.connect(err => {
    if(err) {
        console.log(err);
        throw err;
    }
    else {
        const init_query = `create table if not exists user(
            id varchar(50),
            name varchar(50),
            phone varchar(30),
            age int,
            city varchar(30),
            address text
        );`;
        connection.query(init_query, err => {
            if(err) {
                throw err;
                console.log(err);
            }
            else {
                console.log(`User table created successfully`);
            }
        })
    }
});

module.exports = connection;