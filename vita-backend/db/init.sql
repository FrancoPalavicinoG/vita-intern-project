CREATE DATABASE IF NOT EXISTS vita;
USE vita;

DROP TABLE IF EXISTS clients;
DROP TABLE IF EXISTS appointments;

CREATE TABLE clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    plan_name VARCHAR(255) NOT NULL,
    total_sessions INT NOT NULL,
    used_sessions INT NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT NOT NULL,
    date DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id)
);

INSERT INTO clients (name, email, phone, planName, totalSessions, usedSessions)
VALUES 
("Pepito Fry", "pepito@example.com", "+56911111111", "Plan 10 sesiones", 10, 2),
("Ana Pérez", "ana@example.com", "+56922222222", "Plan 5 sesiones", 5, 5);