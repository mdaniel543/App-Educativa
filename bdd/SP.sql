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


-- Creacion de usuario Estudiante
DELIMITER //
Drop PROCEDURE if EXISTS alumno_create//
CREATE PROCEDURE alumno_create(par_nombre VARCHAR(100), par_apellido VARCHAR(100), par_carnet VARCHAR(100),  par_telefono VARCHAR(100), par_direccion VARCHAR(100), par_correo VARCHAR(100), par_pass VARCHAR(100))
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';

	DECLARE numresp int;

	select COUNT(*) into numresp from Alumno where carnet = par_carnet;

	if (numresp >0) THEN
		set msg_err = 'Alumno ya existe';
	ELSE
		insert into Alumno(Nombre, Apellido, Carnet, Telefono, Direccion, Correo_electronico, Pass) values (par_nombre, par_apellido, par_carnet, par_telefono, par_direccion, par_correo, par_pass);
		SELECT LAST_INSERT_ID() into resp;
	END IF;

	SELECT msg_err, resp;

END//
DELIMITER ;

