SELECT CONCAT(QUOTE(user), '@',QUOTE(host)) AS UserAccount FROM mysql.user;

CREATE USER 'teste'@'localhost' IDENTIFIED BY 'pw';

GRANT privileges OS scope TO conta; --

SHOW GRANTS FOR 'root'@'localhost';

GRANT FILE ON *.* TO 'teste'@'localhost'; -- 

GRANT CREATE TEMPORARY TABLES, LOCK TABLES ON *.* TO 'teste'@'localhost'
GRANT ALL ON teste.* TO 'teste'@'localhost';
GRANT SELECT ON mysql.user TO 'teste'@'localhost';
GRANT SELECT (User,HOST), UPDATE (password_expired) ON mysql.user TO 'teste'@'localhost'; --

REVOKE FILE ON *.* FROM 'teste'@'localhost';
REvoke CREATE TEMPORARY TABLE ON *.* FROM 'teste'@'localhost'
REVOKE ALL ON teste.* FROM 'teste'@'localhost';
REVOKE SELECT (User, Host), UPDATE(password_expired) ON mysql.user FROM 'teste'@'localhost';
REVOKE SELECT ON mysql.user FROM 'teste'@'localhost'; -- 

show grants for 'USER1'@'localhost';

RENAME USER 'teste'@'localhost' TO 'teste2'@'localhost';

DROP USER 'teste2'@'localhost'