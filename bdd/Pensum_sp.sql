-- pensum: Creacion
DELIMITER //
Drop PROCEDURE if EXISTS pensum_asignar//
CREATE PROCEDURE pensum_asignar(par_id_materia int, par_id_carrera int)
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';

	DECLARE numresp int;

	select COUNT(*) into numresp from Pensum where idMateria = par_id_materia and idCarrera = par_id_carrera;

	if (numresp >0) THEN
		set msg_err = 'La materia ya esta asignada a la carrera';
	ELSE
		insert into Pensum(idMateria, idCarrera) 
        values (par_id_materia, par_id_carrera);
		set resp = 'Materia asignada correctamente';
	END IF;

	SELECT msg_err, resp;

END//
DELIMITER ;

-- pensum obtiene todos los registros de la tabla pensum
DELIMITER //
Drop PROCEDURE if EXISTS pensum_TODO//
CREATE PROCEDURE pensum_TODO()
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';
    DECLARE numresp int;

    select * from Carrera c 
    join Pensum p on p.idCarrera = c.idCarrera
    join Materia m on m.idMateria = p.idMateria;

END//
DELIMITER ;

-- pensum se obtiene uno en especifico
DELIMITER //
Drop PROCEDURE if EXISTS materias_get_by_carrera_id//
CREATE PROCEDURE materias_get_by_carrera_id(par_id_carrera int)
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';
    DECLARE numresp int;

    if(par_id_carrera >0) then
        select * from Carrera c 
        join Pensum p on p.idCarrera = c.idCarrera
        join Materia m on m.idMateria = p.idMateria 
        where c.idCarrera = par_id_carrera;    
    end if;
    
END//
DELIMITER ;