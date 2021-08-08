INSERT INTO department (name)
VALUES
("Customer Support"),
("Engineering"),
("Finance"),
("Information Systems");

INSERT INTO role (title, salary, department_id)
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
("IT Manager", 90000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE 
    ("Dana", "Bottoni", 1, 2),
    ("Ronald", "Firbank", 2, NULL),
    ("Virginia", "Woolf", 3, 5),
    ("Piers", "Gaveston", 4, 5),
    ("Charles", "LeRoi", 5, NULL),
    ("Katherine", "Mansfield", 6, 8),
    ("Dora", "Carrington", 7, 8),
    ("Edward", "Bellamy", 8, NULL),
    ("Montague", "Summers", 9, 10),
    ("Octavia", "Butler", 10, NULL);