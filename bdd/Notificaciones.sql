-- notificacion: Creacion
DELIMITER //
Drop PROCEDURE if EXISTS notificacion_create//
CREATE PROCEDURE notificacion_create(par_titulo VARCHAR(100), par_contenido varchar(100),
par_idAlumno int, par_id_materia int)
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';
	DECLARE respAlumno int;
    DECLARE respMateria int;

    select COUNT(*) into respAlumno from Alumno where idAlumno = par_idAlumno;
    select COUNT(*) into respMateria from Materia where idMateria = par_id_materia;

	if (respAlumno = 0 and respMateria = 0) THEN
		set msg_err = 'Datos no encontrados';
	ELSE
		insert into Notificacion(Titulo, Contenido, Fecha_hora_publicacion, idAlumno, idMateria, Estado) 
        values (par_titulo, par_contenido,now(), par_idAlumno, par_id_materia,1);
		set resp = 'notificacion creado exitosamente';
	END IF;

	SELECT msg_err, resp;

END//
DELIMITER ;

-- notificacion actualizacion y eliminacion
DELIMITER //
Drop PROCEDURE if EXISTS notificacion_update_delete//
CREATE PROCEDURE notificacion_update_delete(par_id_notificacion int, par_estado int)
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';
    DECLARE numresp int;

    select COUNT(*) into numresp from Notificacion where idnotificacion = par_id_notificacion;

    if( numresp = 1) then
            update Notificacion
            set Estado = par_estado
           where idNotificacion = par_id_notificacion;
           set msg_err = 'notificacion actualizada';
    else
      set msg_err = 'notificacion no encontrado';
    end if;

	SELECT msg_err, resp;

END//
DELIMITER ;



-- notificacion: obtiene todos los registros de la tabla notificacion
DELIMITER //
Drop PROCEDURE if EXISTS notificacion_get_by_alumno_id//
CREATE PROCEDURE notificacion_get_by_alumno_id(par_id_alumno int)
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';
    DECLARE numresp int;

    select n.*, a.carnet, a.Nombre as Nombre_alumno, a.Apellido as Apellido_aluno, m.Nombre as Nombre_materia from Notificacion n
    join Materia m on m.idMateria = n.idMateria
    join Alumno a on a.idAlumno = n.idAlumno
    where n.idAlumno = par_id_alumno;

END//
DELIMITER ;
