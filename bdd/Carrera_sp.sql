-- Carrera: Creacion
DELIMITER //
Drop PROCEDURE if EXISTS carrera_create//
CREATE PROCEDURE carrera_create(par_nombre_carrera VARCHAR(100), par_descripcion VARCHAR(100))
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';

	DECLARE numresp int;

	select COUNT(*) into numresp from Carrera where Nombre_carrera = par_nombre_carrera;

	if (numresp >0) THEN
		set msg_err = 'Carrera ya existe';
	ELSE
		insert into Carrera(Nombre_carrera, Descripcion, Estado, Fecha_creacion) 
        values (par_nombre_carrera, par_descripcion, 1, now());
		SELECT LAST_INSERT_ID() into resp;
	END IF;

	SELECT msg_err, resp;

END//
DELIMITER ;

-- Carrera actualizacion y eliminacion
DELIMITER //
Drop PROCEDURE if EXISTS carrera_update_delete//
CREATE PROCEDURE carrera_update_delete(par_tipo_operacion int, par_idCarrera int,
par_nombre_carrera VARCHAR(100), par_descripcion VARCHAR(100), par_estado int)
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';
    DECLARE numresp int;

    select COUNT(*) into numresp from Carrera where idCarrera = par_idCarrera;

    if( numresp = 1) then
      if (par_tipo_operacion = 1) THEN
            update Carrera
            set Nombre_carrera = par_nombre_carrera,
            Descripcion = par_descripcion
            where idCarrera = par_idCarrera;
            
            set resp = 'carrera actualizada correctamente';
        elseif (par_tipo_operacion = 2) THEN
            update Carrera
            set estado = par_estado
           where idCarrera = par_idCarrera;

            set resp = 'carrera ha cambiado de estado';
        else
            set msg_err = 'operacion no reconocida';
        end if;
    else
      set msg_err = 'carrera no encontrado';
    end if;

	SELECT msg_err, resp;

END//
DELIMITER ;


-- carrera obtiene todos los registros de la tabla carrera
DELIMITER //
Drop PROCEDURE if EXISTS carrera_TODO//
CREATE PROCEDURE carrera_TODO()
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';
    DECLARE numresp int;

    select * from Carrera;

END//
DELIMITER ;

-- carrera se obtiene uno en especifico
DELIMITER //
Drop PROCEDURE if EXISTS carrera_get_by_id//
CREATE PROCEDURE carrera_get_by_id(par_idCarrera int, par_nombre_carrera varchar(100))
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';
    DECLARE numresp int;

    if(par_idCarrera >0) then
        select * from Carrera where idCarrera = par_idCarrera;    
    else
        select * from Carrera where Nombre_carrera = par_nombre_carrera;
    end if;
    
END//
DELIMITER ;