-- Alumno: Creacion
DELIMITER //
Drop PROCEDURE if EXISTS alumno_asignar_carrera//
CREATE PROCEDURE alumno_asignar_carrera(par_id_carrera int, par_id_alumno int)
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';

	DECLARE numresp int;

	select COUNT(*) into numresp from Alumno where idAlumno = par_id_alumno;

	if (numresp >0) THEN
		update Alumno set idCarrera = par_id_carrera where idAlumno = par_id_alumno;
		set resp = 'Se ha asignado correctamente el alumno a la carrera';
	END IF;

	SELECT msg_err, resp;

END//
DELIMITER ;

-- Asignacion_maestro se obtiene uno en especifico
DELIMITER //
Drop PROCEDURE if EXISTS materias_get_by_alumno_id//
CREATE PROCEDURE materias_get_by_alumno_id(par_id_alumno int)
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';
    DECLARE numresp int;

    if(par_id_alumno >0) then
        select * from Materia m 
        join Pensum p on p.idMateria = m.idMateria
        join Carrera c on c.idCarrera = p.idCarrera
        join Alumno a on a.idCarrera = c.idCarrera
        where a.idAlumno = par_id_alumno;    
    end if;
    
END//
DELIMITER ;