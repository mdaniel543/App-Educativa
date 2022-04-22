-- Asignacion_maestro: Creacion
DELIMITER //
Drop PROCEDURE if EXISTS materia_asignar_maestro//
CREATE PROCEDURE materia_asignar_maestro(par_id_materia int, par_id_maestro int)
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';

	DECLARE numresp int;

	select COUNT(*) into numresp from Asignacion_maestro where idMateria = par_id_materia and idMaestro = par_id_maestro;

	if (numresp >0) THEN
		set msg_err = 'La materia ya tiene maestro asignado';
	ELSE
		insert into Asignacion_maestro(idMateria, idMaestro) 
        values (par_id_materia, par_id_maestro);
		set resp = 'El maestro fue asignado correctamente a la materia';
	END IF;

	SELECT msg_err, resp;

END//
DELIMITER ;

-- Asignacion_maestro obtiene todos los registros de la tabla Asignacion_maestro
DELIMITER //
Drop PROCEDURE if EXISTS Asignacion_maestro_TODO//
CREATE PROCEDURE Asignacion_maestro_TODO()
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';
    DECLARE numresp int;

    select * from Maestro m 
    join Asignacion_maestro am on am.idMaestro = m.idMaestro
    join Materia mt on mt.idMateria = mt.idMateria;

END//
DELIMITER ;

-- Asignacion_maestro se obtiene uno en especifico
DELIMITER //
Drop PROCEDURE if EXISTS materias_get_by_maestro_id//
CREATE PROCEDURE materias_get_by_maestro_id(par_id_maestro int)
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';
    DECLARE numresp int;

    if(par_id_carrera >0) then
        select * from Maestro m 
        join Asignacion_maestro am on am.idMaestro = m.idMaestro
        join Materia mt on mt.idMateria = mt.idMateria
        where m.idMaestro = par_id_maestro;    
    end if;
    
END//
DELIMITER ;