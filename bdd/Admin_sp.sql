-- Creacion de usuario admin
DELIMITER //
Drop PROCEDURE if EXISTS admin_create//
CREATE PROCEDURE admin_create(par_nombre VARCHAR(100), par_pass VARCHAR(100))
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';

	DECLARE numresp int;

	select COUNT(*) into numresp from Administrador where Nombre = par_nombre;

	if (numresp >0) THEN
		set msg_err = 'usuario ya existe';
	ELSE
		insert into Administrador(Nombre, Pass) values (par_nombre, par_pass);
		SELECT LAST_INSERT_ID() into resp;
	END IF;

	SELECT msg_err, resp;

END //
DELIMITER ;


