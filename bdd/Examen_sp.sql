-- examen: Creacion
DELIMITER //
Drop PROCEDURE if EXISTS examen_create//
CREATE PROCEDURE examen_create(par_titulo VARCHAR(100), par_fecha_publicacion date,
par_hora_inicio time, par_hora_fin time, par_id_materia int)
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';
	DECLARE numresp int;

    select COUNT(*) into numresp from Examen where idExamen = par_titulo;

	if (par_titulo = '' or numresp = 1) THEN
		set msg_err = 'Ingresa un titulo diferente';
	ELSE
		insert into Examen(idExamen, Fecha_publicacion, Hora_inicio, Hora_fin, idMateria, Estado, Fecha_creacion) 
        values (par_titulo, par_fecha_publicacion, par_hora_inicio, par_hora_fin, par_id_materia, 1, now());
		set resp = 'Examen creado exitosamente';
	END IF;

	SELECT msg_err, resp;

END//
DELIMITER ;

-- examen actualizacion y eliminacion
DELIMITER //
Drop PROCEDURE if EXISTS examen_update_delete//
CREATE PROCEDURE examen_update_delete(par_tipo_operacion int, par_idexamen varchar(100),
par_fecha_publicacion date, par_hora_inicio time, par_hora_fin time, par_estado int)
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';
    DECLARE numresp int;

    select COUNT(*) into numresp from Examen where idExamen = par_idexamen;

    if( numresp = 1) then
      if (par_tipo_operacion = 1) THEN
            update Examen
            set Fecha_publicacion = par_fecha_publicacion,
            Hora_inicio = par_hora_inicio,
            Hora_fin = par_hora_fin
            where idExamen = par_idexamen;
            
            set resp = 'examen actualizada correctamente';
            
        elseif (par_tipo_operacion = 2) THEN
            update Examen
            set Estado = par_estado
           where idExamen = par_idexamen;

            set resp = 'examen ha cambiado de estado';
        else
            set msg_err = 'operacion no reconocida';
        end if;
    else
      set msg_err = 'examen no encontrado';
    end if;

	SELECT msg_err, resp;

END//
DELIMITER ;

-- examen obtiene todos los registros de la tabla examen
DELIMITER //
Drop PROCEDURE if EXISTS examen_TODO//
CREATE PROCEDURE examen_TODO()
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';
    DECLARE numresp int;

    select e.*, m.Nombre as Nombre_materia from Examen e
    join Materia m on m.idMateria = e.idMateria;

END//
DELIMITER ;

-- examen: se obtiene uno en especifico
DELIMITER //
Drop PROCEDURE if EXISTS examen_get_by_id//
CREATE PROCEDURE examen_get_by_id(par_idexamen varchar(100))
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';
    DECLARE numresp int;

    if(par_idexamen != '') then
        select e.*, m.Nombre as Nombre_materia from Examen e
    join Materia m on m.idMateria = e.idMateria where e.idexamen = par_idexamen;    
    end if;
    
END//
DELIMITER ;

-- examen: obtiene todos los registros de la tabla examen
DELIMITER //
Drop PROCEDURE if EXISTS examen_get_by_materia_id//
CREATE PROCEDURE examen_get_by_materia_id(par_id_materia int)
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';
    DECLARE numresp int;

    select e.* from Examen e
    join Materia m on m.idMateria = e.idMateria
    where m.idMateria = par_id_materia;

END//
DELIMITER ;