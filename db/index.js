
const connection = require('./connection');

class Database {
    constructor(connection) {
        this.connection = connection
    }

    findAllEmployees() {
        return this.connection.promise().query(
           'SELECT * FROM employee ',
        )
    }
}

module.exports = new Database(connection)