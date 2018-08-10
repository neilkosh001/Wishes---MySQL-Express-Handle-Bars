CREATE DATABASE wishes_db;
USE wishes_db;

CREATE TABLE wishes

(
    id int NOT NULL AUTO_INCREMENT,
    wish VARCHAR (55) NOT NULL,
    PRIMARY KEY (id)

);

INSERT INTO wishes (wish) VALUES ("Car"),("Money"),("Car"
);