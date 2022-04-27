-- respuesta: Creacion
DELIMITER //
Drop PROCEDURE if EXISTS respuesta_create//
CREATE PROCEDURE respuesta_create(par_texto_respuesta varchar(100), par_es_respuesta boolean, par_id_pregunta int)
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';
	DECLARE intresp int;

    select COUNT(*) into intresp from Pregunta where idPregunta = par_id_pregunta;


	if (intresp = 0) THEN
		set msg_err = 'Pregunta no encontrado';
	ELSE
		insert into Respuesta(Texto_respuesta, esRespuesta, idPregunta, Estado) 
        values (par_texto_respuesta, par_es_respuesta, par_id_pregunta,1);
		SELECT LAST_INSERT_ID() into resp;
	END IF;

	SELECT msg_err, resp;

END//
DELIMITER ;

-- respuesta actualizacion y eliminacion
DELIMITER //
Drop PROCEDURE if EXISTS respuesta_update_delete//
CREATE PROCEDURE respuesta_update_delete(par_tipo_operacion int, par_id_respuesta int, par_texto_respuesta varchar(100), par_es_respuesta boolean, par_estado int)
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';
    DECLARE numresp int;

    select COUNT(*) into numresp from Respuesta where idrespuesta = par_id_respuesta;

    if( numresp = 1) then
      if (par_tipo_operacion = 1) THEN
            update Respuesta
            set Texto_respuesta = par_texto_respuesta,
            esRespuesta = par_es_respuesta
           where idRespuesta = par_id_respuesta;
           set msg_err = 'respuesta actualizada';
     elseif (par_tipo_operacion = 2) THEN
            update Respuesta
            set Estado = par_estado
            where idRespuesta = par_id_respuesta;

            set resp = 'respuesta ha cambiado de estado';
        else
            set msg_err = 'operacion no reconocida';
        end if;
    else
      set msg_err = 'respuesta no encontrado';
    end if;

	SELECT msg_err, resp;

END//
DELIMITER ;



-- respuesta: obtiene todos los registros de la tabla respuesta
DELIMITER //
Drop PROCEDURE if EXISTS respuesta_get_by_pregunta_id//
CREATE PROCEDURE respuesta_get_by_pregunta_id(par_id_pregunta varchar(100))
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';
    DECLARE numresp int;

    select * from Respuesta r
    where r.idPregunta = par_id_pregunta;

END//
DELIMITER ;

DELIMITER //
Drop PROCEDURE if EXISTS respuesta_get//
CREATE PROCEDURE respuesta_get(par_id_respuesta int)
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';
    DECLARE numresp int;

    select * from Respuesta r
    where r.idRespuesta = par_id_respuesta;

END//
DELIMITER ;
