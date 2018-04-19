DROP USER IF EXISTS 'catawarning'@'localhost';

CREATE USER 'catawarning'@'localhost'
IDENTIFIED BY 'Cata_warning1';

DROP DATABASE IF EXISTS catawarning;

CREATE DATABASE catawarning;

GRANT ALL PRIVILEGES ON catawarning.* TO catawarning;

USE catawarning;

CREATE TABLE approved_keys (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    approved_key TEXT NOT NULL
);

DELIMITER $$
CREATE FUNCTION verify(approved_key TEXT) RETURNS BOOLEAN
    NOT DETERMINISTIC
BEGIN
    DECLARE result BOOLEAN;
    SET result = ((SELECT COUNT(*) FROM approved_keys WHERE approved_keys.approved_key = approved_key) > 0);
    DELETE FROM approved_keys;
    RETURN result;
END $$
DELIMITER ;
