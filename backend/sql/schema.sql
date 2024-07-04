
CREATE DATABASE IF NOT EXISTS bench_sharing;
USE bench_sharing;


CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'company') NOT NULL
);

CREATE TABLE IF NOT EXISTS bench_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS resources (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type_id INT NOT NULL,
    description TEXT,
    available_from DATE NOT NULL,
    booked_by INT DEFAULT NULL,
    booked_at DATETIME DEFAULT NULL,
    FOREIGN KEY (type_id) REFERENCES bench_types(id) ON DELETE CASCADE,
    FOREIGN KEY (booked_by) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    resource_id INT NOT NULL,
    booked_by INT NOT NULL,
    booked_at DATETIME NOT NULL,
    released_at DATETIME DEFAULT NULL,
    FOREIGN KEY (resource_id) REFERENCES resources(id) ON DELETE CASCADE,
    FOREIGN KEY (booked_by) REFERENCES users(id) ON DELETE CASCADE
);
