DELIMITER //
Drop PROCEDURE if EXISTS entrega_by_actividad//
CREATE PROCEDURE entrega_by_actividad(par_id_actividad int)
BEGIN

    Select * FROM Alumno A 
    join Entrega E on E.idAlumno = A.idAlumno
    join Actividad Ac on Ac.idActividad = E.idActividad
    Where Ac.idActividad = par_id_actividad;

END//   
DELIMITER ;

--ESTE SP NO ESTA EN BD
DELIMITER //
Drop PROCEDURE if EXISTS entrega_by_actividad_alumno//
CREATE PROCEDURE entrega_by_actividad_alumno(par_id_alumno int, par_id_materia int)
BEGIN

    Select E.*, Ac.* FROM Alumno A 
    join Entrega E on E.idAlumno = A.idAlumno
    join Actividad Ac on Ac.idActividad = E.idActividad
    join Materia m on m.IdMateria = Ac.IdMateria
    Where m.IdMateria = par_id_materia and A.idAlumno = par_id_alumno;

END//   
DELIMITER ;

--Actualizo Nota 
DELIMITER //
Drop PROCEDURE if EXISTS entrega_calificar//
CREATE PROCEDURE entrega_calificar(par_idEntrega int, par_nota float(10, 2))
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';
    DECLARE numresp int;

    select COUNT(*) into numresp from Maestro where registro = par_registro;

    if( numresp = 1) then
      if (par_tipo_operacion = 1) THEN
            update Maestro
            set Nombre = par_nombre,
            Apellido = par_apellido, Telefono = par_telefono, Direccion = par_direccion, Correo_electronico = par_correo,
            Fecha_nacimiento = par_fecha_nac, DPI = par_dpi, Path_foto = par_path_foto
            where registro = par_registro;
            
            set resp = 'datos actualizados correctamente';
        elseif (par_tipo_operacion = 2) THEN
            
        else
            set msg_err = 'operacion no reconocida';
        end if;
    else
      set msg_err = 'maestro no encontrado';
    end if;

	SELECT msg_err, resp;

END//
DELIMITER ;