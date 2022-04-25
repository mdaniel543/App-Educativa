-- Creacion de usuario Estudiante
DELIMITER //
Drop PROCEDURE if EXISTS alumno_create//
CREATE PROCEDURE alumno_create(par_nombre VARCHAR(100), par_apellido VARCHAR(100), par_carnet VARCHAR(100),  par_telefono VARCHAR(100), par_direccion VARCHAR(100), par_correo VARCHAR(100), par_pass VARCHAR(100))
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';

	DECLARE numresp int;

	select COUNT(*) into numresp from Alumno where carnet = par_carnet;

	if (numresp >0) THEN
		set msg_err = 'Alumno ya existe';
	ELSE
		insert into Alumno(Nombre, Apellido, Carnet, Telefono, Direccion, Correo_electronico, Pass, Estado) values (par_nombre, par_apellido, par_carnet, par_telefono, par_direccion, par_correo, par_pass, 1);
		SELECT LAST_INSERT_ID() into resp;
	END IF;

	SELECT msg_err, resp;

END//
DELIMITER ;

-- Alumno actualizacion y eliminacion
DELIMITER //
Drop PROCEDURE if EXISTS alumno_update_delete//
CREATE PROCEDURE alumno_update_delete(par_tipo_operacion int, 
par_nombre VARCHAR(100), par_apellido VARCHAR(100), 
par_carnet VARCHAR(100),  par_telefono VARCHAR(100), 
par_direccion VARCHAR(100), par_correo VARCHAR(100), 
par_estado int)
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';
    DECLARE numresp int;

    select COUNT(*) into numresp from Alumno where carnet = par_carnet;

    if( numresp = 1) then
      if (par_tipo_operacion = 1) THEN
            update Alumno
            set Nombre = par_nombre,
            Apellido = par_apellido, Telefono = par_telefono, Direccion = par_direccion, Correo_electronico = par_correo
            where carnet = par_carnet;
            
            set resp = 'datos actualizados correctamente';
        elseif (par_tipo_operacion = 2) THEN
            update Alumno
            set estado = par_estado
            where carnet = par_carnet;

            set resp = 'alumno cambio de estado';
        else
            set msg_err = 'operacion no reconocida';
        end if;
    else
      set msg_err = 'alumno no encontrado';
    end if;

	SELECT msg_err, resp;

END//
DELIMITER ;


-- Alumno obtiene todos los registros de la tabla alumno
DELIMITER //
Drop PROCEDURE if EXISTS alumno_TODO//
CREATE PROCEDURE alumno_TODO(par_offset int, par_page int)
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';
    DECLARE numresp int;

    select * from Alumno Limit par_offset, par_page;

END//
DELIMITER ;

-- Alumno se obtiene uno en especifico
DELIMITER //
Drop PROCEDURE if EXISTS alumno_get_by_id//
CREATE PROCEDURE alumno_get_by_id(par_idalumno int, par_carnet varchar(100))
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';
    DECLARE numresp int;

    if(par_carnet != '') then
        select * from Alumno where carnet = par_carnet;
    else
        select * from Alumno where idAlumno = par_idalumno;
    end if;
    
END//
DELIMITER ;


-- envia id materia para el listado de alumnos asignados
DELIMITER //
Drop PROCEDURE if EXISTS alumnos_get_by_id_materia//
CREATE PROCEDURE alumnos_get_by_id_materia(par_idMateria int)
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';
    DECLARE numresp int;

    Select A.* FROM Alumno A 
    join Pensum p on p.idCarrera = A.idCarrera
    join Materia m on m.idMateria = p.idMateria
    Where m.idMateria = par_idMateria;

END//
DELIMITER ;