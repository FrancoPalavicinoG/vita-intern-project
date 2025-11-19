USE vita_db;

DROP TABLE IF EXISTS appointments;
DROP TABLE IF EXISTS clients;

CREATE TABLE clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    planName VARCHAR(255) NOT NULL,
    totalSessions INT NOT NULL,
    usedSessions INT NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    clientId INT NOT NULL,
    date DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (clientId) REFERENCES clients(id)
);

INSERT INTO clients 
(name, email, phone, planName, totalSessions, usedSessions)
VALUES 
("Pepito Fry", "pepito@example.com", "+56911111111", "Plan 10 sesiones", 10, 2),
("Ana Perez", "ana@example.com", "+56922222222", "Plan 5 sesiones", 5, 5);