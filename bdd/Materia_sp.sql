-- materia: Creacion
DELIMITER //
Drop PROCEDURE if EXISTS materia_create//
CREATE PROCEDURE materia_create(par_nombre_materia VARCHAR(100), par_descripcion VARCHAR(100))
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';

	DECLARE numresp int;

	select COUNT(*) into numresp from Materia where Nombre = par_nombre_materia;

	if (numresp >0) THEN
		set msg_err = 'materia ya existe';
	ELSE
		insert into Materia(Nombre, Descripcion, Estado) 
        values (par_nombre_materia, par_descripcion, 1);
		SELECT LAST_INSERT_ID() into resp;
	END IF;

	SELECT msg_err, resp;

END//
DELIMITER ;

-- materia actualizacion y eliminacion
DELIMITER //
Drop PROCEDURE if EXISTS materia_update_delete//
CREATE PROCEDURE materia_update_delete(par_tipo_operacion int, par_idmateria int,
par_nombre_materia VARCHAR(100), par_descripcion VARCHAR(100), par_estado int)
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';
    DECLARE numresp int;
    select COUNT(*) into numresp from Materia where idmateria = par_idmateria;

    if( numresp = 1) then
      if (par_tipo_operacion = 1) THEN
            update Materia
            set Nombre = par_nombre_materia,
            Descripcion = par_descripcion
            where idMateria = par_idmateria;
            
            set resp = 'materia actualizada correctamente';
        elseif (par_tipo_operacion = 2) THEN
            update Materia
            set Estado = par_estado
           where idMateria = par_idmateria;

            set resp = 'materia ha cambiado de estado';
        else
            set msg_err = 'operacion no reconocida';
        end if;
    else
      set msg_err = 'materia no encontrado';
    end if;

	SELECT msg_err, resp;

END//
DELIMITER ;


-- materia obtiene todos los registros de la tabla materia
DELIMITER //
Drop PROCEDURE if EXISTS materia_TODO//
CREATE PROCEDURE materia_TODO()
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';
    DECLARE numresp int;

    select * from Materia;

END//
DELIMITER ;

-- materia se obtiene uno en especifico
DELIMITER //
Drop PROCEDURE if EXISTS materia_get_by_id//
CREATE PROCEDURE materia_get_by_id(par_idmateria int, par_nombre_materia varchar(100))
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';
    DECLARE numresp int;

    if(par_idmateria >0) then
        select * from Materia where idMateria = par_idmateria;    
    else
        select * from Materia where Nombre = par_nombre_materia;
    end if;
    
END//
DELIMITER ;