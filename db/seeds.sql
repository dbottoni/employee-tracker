INSERT INTO department (name)
VALUES
("Customer Support"),
("Engineering"),
("Finance"),
("Information Systems"),
("Marketing"),
("Outside Sales");

INSERT INTO role (job_title, salary, department_id)
VALUES
("Call Center Rep", 50000, 1),
("Call Center Manager", 80000, 1),
("Engineer 1", 75000, 2),
("Engineer 2", 92000, 2),
("Engineering Manager", 105000, 2),
("Accounting Clerk", 53000, 3),
("Accountant", 80000, 3),
("Accounting Manager", 100000, 3),
("IT Support", 67000, 4),
("IT Manager", 90000, 4),
("Graphic Designer", 63000, 5),
("Marketing Manager", 85000, 5),
("Outside Sales Rep", 79000, 6),
("Outside Sales Manager", 93000, 6);

-- INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- VALUE (
--  ("Dana Bottoni", 3, NULL),
--  ("")
-- );