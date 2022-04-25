-- publicacion: Creacion
DELIMITER //
Drop PROCEDURE if EXISTS publicacion_create//
CREATE PROCEDURE publicacion_create(par_titulo VARCHAR(100), par_descripcion VARCHAR(100), 
par_id_materia int, par_fecha_publicacion date, par_fecha_entrega date, par_valor decimal(10,2))
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';
	DECLARE numresp int;

    select COUNT(*) into numresp from Materia where idMateria = par_id_materia;

	if (par_titulo = '' or  par_descripcion = '' or numresp = 0) THEN
		set msg_err = 'Datos incompletos';
	ELSE
		insert into publicacion(Titulo, Descripcion, idMateria, Fecha_creacion, Fecha_publicacion, Fecha_entrega, Valor, Estado) 
        values (par_titulo, par_descripcion, par_id_materia, now(), par_fecha_publicacion, par_fecha_entrega, par_valor, 1);
		SELECT LAST_INSERT_ID() into resp;
	END IF;

	SELECT msg_err, resp;

END//
DELIMITER ;

-- publicacion actualizacion y eliminacion
DELIMITER //
Drop PROCEDURE if EXISTS publicacion_update_delete//
CREATE PROCEDURE publicacion_update_delete(par_tipo_operacion int, par_idpublicacion int, par_titulo VARCHAR(100), par_descripcion VARCHAR(100), 
par_fecha_publicacion date, par_fecha_entrega date, par_valor decimal(10,2), par_estado int)
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';
    DECLARE numresp int;

    select COUNT(*) into numresp from publicacion where idpublicacion = par_idpublicacion;

    if( numresp = 1) then
      if (par_tipo_operacion = 1) THEN
            update publicacion
            set Titulo = par_titulo,
            Descripcion = par_descripcion,
            Fecha_publicacion = par_fecha_publicacion,
            Fecha_entrega = par_fecha_entrega,
            Valor = par_valor
            where idpublicacion = par_idpublicacion;
            
            set resp = 'publicacion actualizada correctamente';
        elseif (par_tipo_operacion = 2) THEN
            update publicacion
            set Estado = par_estado
           where idpublicacion = par_idpublicacion;

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

-- publicacion obtiene todos los registros de la tabla publicacion
DELIMITER //
Drop PROCEDURE if EXISTS publicacion_TODO//
CREATE PROCEDURE publicacion_TODO()
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';
    DECLARE numresp int;

    select a.*, m.Nombre as Nombre_materia from publicacion a
    join Materia m on m.idMateria = a.idMateria;

END//
DELIMITER ;

-- publicacion se obtiene uno en especifico
DELIMITER //
Drop PROCEDURE if EXISTS publicacion_get_by_id//
CREATE PROCEDURE publicacion_get_by_id(par_idpublicacion int)
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';
    DECLARE numresp int;

    if(par_idpublicacion >0) then
        select a.*, m.Nombre as Nombre_materia from publicacion a
    join Materia m on m.idMateria = a.idMateria where a.idpublicacion = par_idpublicacion;    
    end if;
    
END//
DELIMITER ;

-- publicacion obtiene todos los registros de la tabla publicacion
DELIMITER //
Drop PROCEDURE if EXISTS publicacion_get_by_materia_id//
CREATE PROCEDURE publicacion_get_by_materia_id(par_id_materia int)
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';
    DECLARE numresp int;

    select a.* from publicacion a
    join Materia m on m.idMateria = a.idMateria
    where m.idMateria = par_id_materia;

END//
DELIMITER ;