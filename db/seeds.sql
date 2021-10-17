INSERT INTO department(name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO roles(title, salary, department_id)
VALUES
    ('Sales Lead',100000,1),
    ('Sales person',80000,1),
    ('Lead Engineer',150000,2),
    ('Software Engineer',120000,2),
    ('Accountant',125000,3),
    ('Legal Team Lead',250000,4),
    ('Lawyer',190000,4),
    ('Lead Engineer',150000,2);

INSERT INTO manager(name)
VALUES
    ('Ashley Rodrigues'),
    ('John Doe'),
    ('Sarah Lourd'),
    ('Mike Chan');

INSERT INTO employee(first_name, last_name, role_id, manager_id, dept_id)
VALUES
    ('John','Doe',1,1,1),
    ('Mike','Chan',2,2,1),
    ('Ashley','Rodrigues',3,1,2),
    ('Kevin','Tupik',4,1,2),
    ('Malia','Brown',5,1,3),
    ('Sarah','Lours',6,2,4),
    ('Tom','Allen',7,3,4),
    ('Christian','Eckenrode',8,4,2);