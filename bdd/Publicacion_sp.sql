--Publicacion create 
-- materia: Creacion
DELIMITER //
Drop PROCEDURE if EXISTS publicacion_create//
CREATE PROCEDURE publicacion_create(par_descripcion VARCHAR(250), par_idMateria int)
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';

	DECLARE numresp int;


    insert into Publicacion(Descripcion, Fecha_publicacion, idMateria, Estado) 
    values (par_descripcion, now(), par_idMateria, 1);
    
    SELECT LAST_INSERT_ID() into resp;


	SELECT msg_err, resp;

END//
DELIMITER ;


DELIMITER //
Drop PROCEDURE if EXISTS publicacion_get_by_materia_id//
CREATE PROCEDURE publicacion_get_by_materia_id(par_idMateria int)
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';

	DECLARE numresp int;


    select p.* from Publicacion p
    join Materia m on m.idMateria = p.idMateria
    where m.idMateria = par_idMateria;

END//
DELIMITER ;