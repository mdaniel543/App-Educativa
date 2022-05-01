-- examen: obtiene todos los registros de la tabla examen
DELIMITER //
Drop PROCEDURE if EXISTS examen_get_by_materia_id_alumno//
CREATE PROCEDURE examen_get_by_materia_id_alumno(par_id_materia int, par_id_alumnno int)
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';
    DECLARE numresp int;

    select e.*, r.* from Examen e
    join Materia m on m.idMateria = e.idMateria
    join Realizacion_examen r on e.idExamen = r.idExamen
    where m.idMateria = par_id_materia and r.idAlumno = par_id_alumnno;

END//
DELIMITER ;

DELIMITER //
Drop PROCEDURE if EXISTS realizacion_examen_update//
CREATE PROCEDURE realizacion_examen_update(par_id_alumnno int, par_idexamen varchar(100), par_nota int)
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';
    DECLARE numresp int;

    select COUNT(*) into numresp from Examen where idExamen = par_idexamen;

    if( numresp = 1) then
      
        update Realizacion_examen
        set nota = par_nota,
        realizacion = 1
        where idExamen = par_idexamen
        and idAlumno = par_id_alumnno;
        
        set resp = 'examen actualizada correctamente';
        
    else
      set msg_err = 'examen no encontrado';
    end if;

	SELECT msg_err, resp;

END//
DELIMITER ;

