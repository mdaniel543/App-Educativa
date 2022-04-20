-- Creacion de usuario Maestro
DELIMITER //
Drop PROCEDURE if EXISTS maestro_create//
CREATE PROCEDURE maestro_create(par_nombre VARCHAR(100), par_apellido VARCHAR(100), par_registro VARCHAR(100),  
par_telefono VARCHAR(100), par_direccion VARCHAR(100), par_correo VARCHAR(100), par_fecha_nac varchar(100),
par_dpi varchar(100), par_path_foto varchar(100), par_pass VARCHAR(100))
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';

	DECLARE numresp int;

	select COUNT(*) into numresp from Maestro where registro = par_registro;

	if (numresp >0) THEN
		set msg_err = 'maestro ya existe';
	ELSE
		insert into Maestro(Nombre, Apellido, Registro, Telefono, Direccion, Correo_electronico, Fecha_nacimiento, DPI, Path_foto, Pass, Estado) 
        values (par_nombre, par_apellido, par_registro, par_telefono, par_direccion, par_correo, par_fecha_nac, par_dpi, par_path_foto, par_pass, 1);
		SELECT LAST_INSERT_ID() into resp;
	END IF;

	SELECT msg_err, resp;

END//
DELIMITER ;

-- Maestros actualizacion y eliminacion
DELIMITER //
Drop PROCEDURE if EXISTS maestro_update_delete//
CREATE PROCEDURE maestro_update_delete(par_tipo_operacion int, 
par_nombre VARCHAR(100), par_apellido VARCHAR(100), par_registro VARCHAR(100),  
par_telefono VARCHAR(100), par_direccion VARCHAR(100), par_correo VARCHAR(100), par_fecha_nac varchar(100),
par_dpi varchar(100), par_path_foto varchar(100),
par_estado int)
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';
    DECLARE numresp int;

    select COUNT(*) into numresp from Maestro where registro = par_registro;

    if( numresp = 1) then
      if (par_tipo_operacion = 1) THEN
            update Maestro
            set Nombre = par_nombre,
            Apellido = par_apellido, Telefono = par_telefono, Direccion = par_direccion, Correo_electronico = par_correo,
            Fecha_nacimiento = par_fecha_nac, DPI = par_dpi, Path_foto = par_path_foto
            where registro = par_registro;
            
            set resp = 'datos actualizados correctamente';
        elseif (par_tipo_operacion = 2) THEN
            update Maestro
            set estado = par_estado
            where registro = par_registro;

            set resp = 'maestro cambio de estado';
        else
            set msg_err = 'operacion no reconocida';
        end if;
    else
      set msg_err = 'maestro no encontrado';
    end if;

	SELECT msg_err, resp;

END//
DELIMITER ;


-- maestro obtiene todos los registros de la tabla maestro
DELIMITER //
Drop PROCEDURE if EXISTS maestro_TODO//
CREATE PROCEDURE maestro_TODO(par_offset int, par_page int)
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';
    DECLARE numresp int;

    select * from Maestro Limit par_offset, par_page;

END//
DELIMITER ;

-- maestro se obtiene uno en especifico
DELIMITER //
Drop PROCEDURE if EXISTS maestro_get_by_id//
CREATE PROCEDURE maestro_get_by_id(par_idmaestro int, par_registro varchar(100))
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';
    DECLARE numresp int;

    if(par_registro != '') then
        select * from Maestro where registro = par_registro;
    else
        select * from Maestro where idmaestro = par_idmaestro;
    end if;
    
END//
DELIMITER ;