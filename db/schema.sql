DROP DATABASE IF EXISTS company;
CREATE DATABASE company;

USE company;

CREATE TABLE department(
    id INTEGER AUTO_INCREMENT,
    name VARCHAR(30),
    PREMARY KEY(id)
);


CREATE TABLE roles(
    id INTEGER AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    department_id INTEGER,
    PREMARY KEY(id),
    FOREIGN KEY(department_id) REFERENCES department(id) ON DELETE SET NULL
);


CREATE TABLE manager(
    id INTEGER AUTO_INCREMENT,
    name VARCHAR(30),
    PREMARY KEY(id)
);

CREATE TABLE employee(
    id INTEGER AUTO_INCREMENT PREMARY KEY,
    first_name VARCHAE(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    dept_id INTEGER,
    PREMARY KEY(id),
    FOREIGN KEY(role_id) REFERENCES roles(id) ON DELETE SET NULL
    FOREIGN KEY(manager_id) REFERENCES manager(id) ON DELETE SET NULL
    FOREIGN KEY(dept_id) REFERENCES department(id) ON DELETE SET NULL
);