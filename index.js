const inquirer = require('inquirer')
const database = require('./db')

employeeList = [];
database.findAllEmployees().then(employees => {
    console.log(employees[0])
    employeeList = employees;

    promptUser(employees[0])
});

const promptUser = (employeeList) => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'employee-list',
            message: 'Which employee would you like to select?',
            choices: employeeList.map(employee => ({ name: employee.first_name, value: employee.id})
        },
    ])
}
