INSERT INTO department (dept_name, utilized_budget)
VALUES ('Administration', 1000000),
       ('Human Resources', 75000),
       ('Finances', 300000),
       ('Production & Inventory', 300000),
       ('Cafeteria & Catering', 50000),
       ('Marketing & Advertisement', 400000);
       
INSERT INTO roles (title, salary, department_id)
VALUES ('Big Boss Man', 1000000, 1),
       ('Talent Management', 75000, 2),
       ('Collections Agent', 100000, 3),
       ('Merchandise Specialist', 150000, 4),
       ('Chef', 50000, 5),
       ('Marketing Director', 200000, 6);
	
INSERT INTO employee (first_name, last_name, emp_dept, salary, manager_id, roles_id)
VALUES ('Bertram', 'Cooper', 'Administration', 1000000, null, 1),
       ('Lane', 'Pryce', 'Human Resources', 75000, 1, 2),
       ('Pete', 'Campbell', 'Finances', 100000, null, 3),
       ('Peggy', 'Olson', 'Finances', 100000, 3, 3),
       ('Ken', 'Cosgrove', 'Finances', 100000, 3, 3),
       ('Harry', 'Crane', 'Production & Inventory', 150000, null, 4),
       ('Paul', 'Kinsey', 'Production & Inventory', 150000, 6, 4),
       ('Salvator', 'Romano', 'Production & Inventory', 150000, 6, 4),
       ('Donald', 'Draper', 'Marketing & Advertisement', 200000, 1, 6),
       ('Betty', 'Draper', 'Cafeteria & Catering', 50000, 1, 5);

INSERT INTO manager (id, mgr_name)
VALUES (1, 'Bertram Cooper'),
       (3, 'Donald Draper'),
       (6, 'Lane Pryce');

SELECT * FROM employee;
SELECT * FROM roles;
SELECT * FROM department;
SELECT * FROM manager;    