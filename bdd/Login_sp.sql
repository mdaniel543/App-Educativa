-- Login de usuarios
DELIMITER //
Drop PROCEDURE if EXISTS usuario_login//
CREATE PROCEDURE usuario_login(par_usuario VARCHAR(100), par_pass VARCHAR(100), par_rol VARCHAR(100))
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';
	DECLARE numresp int;

	if (par_rol = 'A') THEN
		SELECT count(*) into numresp from  Administrador where nombre = par_usuario and Pass = par_pass;

		if numresp = 1 THEN
			-- set resp = 'ok';
			select cast(idAdministrador as char (100)) into resp from Administrador where nombre = par_usuario and Pass = par_pass;
		ELSE
			set msg_err = 'revisar las credenciales';
		end if;
	end if;

	SELECT msg_err, resp;

END //
DELIMITER ;