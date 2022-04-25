-- pregunta: Creacion
DELIMITER //
Drop PROCEDURE if EXISTS pregunta_create//
CREATE PROCEDURE pregunta_create(par_enunciado varchar(100),par_id_examen varchar(100))
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';
	DECLARE intresp int;

    select COUNT(*) into intresp from Examen where idExamen = par_id_examen;


	if (intresp = 0) THEN
		set msg_err = 'Examen no encontrado';
	ELSE
		insert into Pregunta(Enunciado_pregunta, idExamen, Estado) 
        values (par_enunciado, par_id_examen,1);
		SELECT LAST_INSERT_ID() into resp;
	END IF;

	SELECT msg_err, resp;

END//
DELIMITER ;

-- pregunta actualizacion y eliminacion
DELIMITER //
Drop PROCEDURE if EXISTS pregunta_update_delete//
CREATE PROCEDURE pregunta_update_delete(par_tipo_operacion int, par_id_pregunta int, par_enunciado varchar(100), par_estado int)
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';
    DECLARE numresp int;

    select COUNT(*) into numresp from Pregunta where idPregunta = par_id_pregunta;

    if( numresp = 1) then
      if (par_tipo_operacion = 1) THEN
            update Pregunta
            set Enunciado_pregunta = par_enunciado
           where idpregunta = par_id_pregunta;
           set msg_err = 'pregunta actualizada';
     elseif (par_tipo_operacion = 2) THEN
            update Pregunta
            set Estado = par_estado
            where idpregunta = par_id_pregunta;

            set resp = 'pregunta ha cambiado de estado';
        else
            set msg_err = 'operacion no reconocida';
        end if;
    else
      set msg_err = 'pregunta no encontrado';
    end if;

	SELECT msg_err, resp;

END//
DELIMITER ;



-- pregunta: obtiene todos los registros de la tabla pregunta
DELIMITER //
Drop PROCEDURE if EXISTS pregunta_get_by_examen_id//
CREATE PROCEDURE pregunta_get_by_examen_id(par_id_examen varchar(100))
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';
    DECLARE numresp int;

    select p.* from Pregunta p
    join Examen e on e.idExamen = p.idExamen
    where p.idExamen = par_id_examen;

END//
DELIMITER ;
