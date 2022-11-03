INSERT INTO departments (name)
VALUES 
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO roles (title, salary, deptId)
VALUES 
('Sales Lead', 100000, 1),
('Salesperson', 40000, 1),
('Lead Engineer', 150000, 2),
('Software Engineer', 110000, 2),
('Account Manager', 120000, 3),
('Accountant', 125000, 3),
('Legal Team Lead', 250000, 4),
('Lawyer', 190000, 4);

INSERT INTO employees (firstName, lastName, roleId, managerId)
VALUES 
('Jane', 'Doe', 1, NULL),
('Shirley', 'Niemes', 2, 1),
('Michelle', 'Gonzalez', 3, NULL),
('KrisLee', 'Acevedo', 4, 3),
('Mike', 'Curly', 5, NULL),
('Betty', 'Alvarez', 6, 5),
('Jose', 'Alvarez', 7, NULL),
('Nelly', 'Lopez', 8, 7);