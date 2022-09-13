
const connection = require('./connection');

class Database {
    constructor(connection) {
        this.connection = connection
    };

    findAllEmployees() {
        return this.connection.promise().query(
           'SELECT * FROM employee ',
        )
    };

    findAllDepartments() {
        return this.connection.promise().query(
            'SELECT * FROM department',
        )
    };

    findAllRoles() {
        return this.connection.promise().query(
            'SELECT * FROM role',
        )
    };

    addDepartment(newDepartment) {
        return this.connection.promise().query(
            `INSERT INTO department (name)
            VALUES ('${newDepartment}')`,
        )
    };

    getRole(title) {
        return this.connection.promise().query(
            `SELECT * FROM role WHERE title = '${title},`
        )
    }

    async addEmployee(newFirst, newLast, newPosition, newManager) {
        var roleID = await this.getRole(newPosition)
        return this.connection.promise().query(
            `INSERT INTO role (title, salary, department_id)
            VALUES ('${newRole}'), ${newSalary}, ${newRoleID})`,
        )
    }

    async updateEmployee(updateEmployee, updateRole) {
        var roleID = await this.getRole(updateRole)
        return this.connection.promise().query(
            `UPDATE employee
            SET role_id = ('${roleID[0][0].id}')
            WHERE id = ${updateEmployee}`,
        )
    };
};

module.exports = new Database(connection)