-- actividad: Creacion
DELIMITER //
Drop PROCEDURE if EXISTS actividad_create//
CREATE PROCEDURE actividad_create(par_titulo VARCHAR(100), par_descripcion VARCHAR(100), 
par_id_materia int, par_fecha_publicacion date, par_fecha_entrega date, par_valor decimal(10,2))
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';
	DECLARE numresp int;

    select COUNT(*) into numresp from Materia where idMateria = par_id_materia;

	if (par_titulo = '' or  par_descripcion = '' or numresp = 0) THEN
		set msg_err = 'Datos incompletos';
	ELSE
		insert into Actividad(Titulo, Descripcion, idMateria, Fecha_creacion, Fecha_publicacion, Fecha_entrega, Valor, Estado) 
        values (par_titulo, par_descripcion, par_id_materia, now(), par_fecha_publicacion, par_fecha_entrega, par_valor, 1);
		
        SELECT LAST_INSERT_ID() into resp;

        Insert into Entrega (IdAlumno, idActividad, Fecha_creacion, Estado)
        Select A.IdAlumno, resp, par_fecha_publicacion, 0 FROM Alumno A 
        join Pensum P on P.idCarrera = A.idCarrera
        join Materia M on M.idMateria = P.idMateria
        where M.idMateria = par_id_materia;
	END IF;

	SELECT msg_err, resp;

END//
DELIMITER ;

-- actividad actualizacion y eliminacion
DELIMITER //
Drop PROCEDURE if EXISTS actividad_update_delete//
CREATE PROCEDURE actividad_update_delete(par_tipo_operacion int, par_idactividad int, par_titulo VARCHAR(100), par_descripcion VARCHAR(100), 
par_fecha_publicacion date, par_fecha_entrega date, par_valor decimal(10,2), par_estado int)
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';
    DECLARE numresp int;

    select COUNT(*) into numresp from Actividad where idactividad = par_idactividad;

    if( numresp = 1) then
      if (par_tipo_operacion = 1) THEN
            update Actividad
            set Titulo = par_titulo,
            Descripcion = par_descripcion,
            Fecha_publicacion = par_fecha_publicacion,
            Fecha_entrega = par_fecha_entrega,
            Valor = par_valor
            where idActividad = par_idactividad;
            
            set resp = 'actividad actualizada correctamente';
        elseif (par_tipo_operacion = 2) THEN
            update Actividad
            set Estado = par_estado
           where idActividad = par_idactividad;

            set resp = 'actividad ha cambiado de estado';
        else
            set msg_err = 'operacion no reconocida';
        end if;
    else
      set msg_err = 'actividad no encontrado';
    end if;

	SELECT msg_err, resp;

END//
DELIMITER ;

-- actividad obtiene todos los registros de la tabla actividad
DELIMITER //
Drop PROCEDURE if EXISTS actividad_TODO//
CREATE PROCEDURE actividad_TODO()
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';
    DECLARE numresp int;

    select a.*, m.Nombre as Nombre_materia from Actividad a
    join Materia m on m.idMateria = a.idMateria;

END//
DELIMITER ;

-- actividad se obtiene uno en especifico
DELIMITER //
Drop PROCEDURE if EXISTS actividad_get_by_id//
CREATE PROCEDURE actividad_get_by_id(par_idactividad int)
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';
    DECLARE numresp int;

    if(par_idactividad >0) then
        select a.*, m.Nombre as Nombre_materia from Actividad a
    join Materia m on m.idMateria = a.idMateria where a.idActividad = par_idactividad;    
    end if;
    
END//
DELIMITER ;

-- actividad obtiene todos los registros de la tabla actividad
DELIMITER //
Drop PROCEDURE if EXISTS actividad_get_by_materia_id//
CREATE PROCEDURE actividad_get_by_materia_id(par_id_materia int)
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';
    DECLARE numresp int;

    select a.* from Actividad a
    join Materia m on m.idMateria = a.idMateria
    where m.idMateria = par_id_materia;

END//
DELIMITER ;