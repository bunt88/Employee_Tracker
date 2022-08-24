USE employees;

INSERT INTO department (name)
VALUES ('Coorperate'),
    ('Marketing'),
    ('Sales');

INSERT INTO role (title, salary, department_id)
VALUES ('Lawyer', 65000, 1),
    ('CEO', 1000000, 1),
    ('Designers', 45000, 2),
    ('Salesperson', 50000, 3);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Clark', 'Kent', 4, 0),
    ('Bruce', 'Wayne', 2, 2),
    ('Diana', 'Prince', 4, 2);
