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

async function begin() {
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
            var answer = await inquirer.prompt({
                type: 'input',
                message: 'What Department Do You Want To Add',
                name: 'newDepartment',
            });
            console.log(answer);
            await database.addDepartment(answer.newDepartment);
            break;

        case "Add Role":
            var answer = await inquirer.prompt([
                {
                    type: 'input',
                    message: 'What Role Do You Want To Add',
                    name: 'newRole',
                },
                {
                    type: 'input',
                    message: 'What Is The Salary For This Role',
                    name: 'Salary',
                },
                {
                    type: 'input',
                    message: 'What Is The Deapartment ID',
                    name: 'ID',
                },
            ]);
            console.log(answer);
            await database.addRole(answer.newRole, answer.Salary, answer.ID);
            break;

        case "Add Employee":
            console.log(answer);
            let positions = await database.findAllRoles();
            positions = positions[0].map((position) => position.title);
            var answer = await inquirer.prompt([
                {
                    type: 'input',
                    message: 'What Is The Employees First Name',
                    name: 'newEmployee',
                },
                {
                    type: 'input',
                    message: 'What Is The Employees Last Name',
                    name: 'newLastName',
                },
                {
                    type: 'list',
                    message: 'What Is The Employees Role ID',
                    name: 'newPosition',
                    choices: positions,
                },
                {
                    type: 'input',
                    message: 'What Is The Employees Managers ID',
                    name: 'newEmployeeManager',
                },
            ]);
            console.log(answer);
            await database.addEmployee(
                answer.newEmployee,
                answer.newLastName,
                answer.newPosition,
                answer.newEmployeeManager
            );
            break;

            case "Update Employee":
                var employee = await database.findAllEmployees();
                employees = employees[0].map(
                    function(employee) {
                        var object = {
                            name: employee.last_name + "," + employee.first_name,
                            value: employee.id 
                        }
                        return object
                    }
                )
                console.log(employees);
                var position = await database.findAllRoles();
                positions = positions[0].map((position) => position.title);

                var answer = await inquirer.prompt([
                    {
                        type: 'list',
                        message: 'Which Employee Would You Like to Update',
                        name: 'updateName',
                        choices: employees
                    },
                    {
                        type: 'list',
                        message: 'What Is The Employees New Role',
                        name: 'newRole',
                        choices: positions,
                    },
                ]);
                console.log(answer.updateName);
                await database.updateEmployee(answer.updateName, answer.newRole);
                break;
    }
};

begin();