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

DELIMITER //
Drop PROCEDURE if EXISTS publicacion_update_delete//
CREATE PROCEDURE publicacion_update_delete(par_tipo_operacion int, par_idpublicacion int, par_descripcion VARCHAR(250), par_estado int)
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';
    DECLARE numresp int;

    select COUNT(*) into numresp from Publicacion where idPublicacion = par_idpublicacion;

    if( numresp = 1) then
      if (par_tipo_operacion = 1) THEN
            update Publicacion
            set 
            Descripcion = par_descripcion,
            Fecha_publicacion = now()
            where idPublicacion = par_idpublicacion;

            set resp = 'publicacion actualizada correctamente';

        elseif (par_tipo_operacion = 2) THEN
            update Publicacion
            set Estado = par_estado
            where idPublicacion = par_idpublicacion;

            set resp = 'publicacion ha cambiado de estado';
        else
            set msg_err = 'operacion no reconocida';
        end if;
    else
      set msg_err = 'publicacion no encontrado';
    end if;

	SELECT msg_err, resp;

END//
DELIMITER ;
