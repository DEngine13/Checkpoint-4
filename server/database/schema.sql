CREATE TABLE Category (
    Id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    Name VARCHAR(255) NOT NULL
);

CREATE TABLE Task (
    Id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    Title VARCHAR(255) NOT NULL,
    Description TEXT NOT NULL,
    Status VARCHAR(100) NOT NULL,
    Due_Date DATE NOT NULL,
    Category_Id INT NOT NULL, 
    FOREIGN KEY (Category_Id) REFERENCES Category(Id) ON DELETE CASCADE
);
create table user (
  id int unsigned primary key auto_increment not null,
  email varchar(255) not null unique,
  password varchar(255) not null
);

INSERT INTO Category (Name) VALUES
("Work"),
("Fitness"),
("Personal"),
("Health"),
("Shopping");

INSERT INTO Task (Title, Description, Status, Due_Date, Category_Id) VALUES
("Groceries", "Get milk, eggs, and bread", "Pending", "2025-03-25", 5),
("Finish project", "Complete the final report", "In Progress", "2025-03-26", 1),
("Call Mommy", "Check in and catch up", "Pending", "2025-03-28", 3),
("Gym Workout", "Get huge", "Completed", "2025-03-20", 2),
("Doctor's appointment", "get checked for back pain", "Pending", "2025-04-16", 4);

USE Checkpoint4Database;
SELECT * FROM Task;