const inquirer = require('inquirer')
const database = require('./db')
const { findAllEmployees } = require('./db');


const questions = {
    type: 'list',
    name: 'mainList',
    message: 'what do you want to do?',
    choices: [
        "View Departments",
        "View Employees",
        "view Roles",
        "Add Department",
        "Add Role",
        "Add Employee",
        "Update Employee",
        "Delete Department",
        "Delete Role",
        "Delete Employee"
    ],
};

async function start() {
    while (true) {
        let answer = await inquirer.prompt(questions);
        await userAnswer(answer);
    }
};

const userAnswer = async (answer) => {
    switch (answer.mainList) {
        case "View Departments":
            let departments = await database.findAllDepartments();
            console.log(departments[0].map((department) => department.name));
            break;

        case "View Employees":
            let employees = await database.findAllEmployees();
            console.log(employees[0].map((employee) => employee.first_name));
            break;

        case "View Roles":
            let roles = await database.findAllRoles();
            console.log(roles[0].map((role) => role.title));
            break;

        case "Add Department":
            let answer = await inquirer.prompt({
                type: 'input',
                message: 'What Department Do You Want To Add',
                name: 'newDepartment',
            });
            console.log(answer);
            await database.addDepartment(answer.newDepartment);
            break;

        
    }
}