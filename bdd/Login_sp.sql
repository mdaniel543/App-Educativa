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
			select cast(idAdministrador as char (100)) into resp from Administrador where nombre = par_usuario and Pass = par_pass;
		ELSE
			set msg_err = 'revisar las credenciales';
		end if;

	elseif (par_rol = 'E') THEN
		SELECT count(*) into numresp from Alumno where carnet = par_usuario and Pass = par_pass;

		if numresp = 1 THEN
			select cast(idAlumno as char (100)) into resp from Alumno where carnet = par_usuario and Pass = par_pass;
		ELSE
			set msg_err = 'revisar las credenciales';
		end if;

	elseif (par_rol = 'M') THEN
		SELECT count(*) into numresp from Maestro where registro = par_usuario and Pass = par_pass;

		if numresp = 1 THEN
			select cast(idMaestro as char (100)) into resp from Maestro where registro = par_usuario and Pass = par_pass;
		ELSE
			set msg_err = 'revisar las credenciales';
		end if;
	ELSE
		set msg_err = 'Rol no reconocido';
	end if;

	SELECT msg_err, resp;

END //
DELIMITER ;