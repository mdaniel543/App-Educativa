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

    UPDATE Entrega
    SET Puntuacion = par_nota
    WHERE idEntrega = par_idEntrega;

	SELECT msg_err, resp;

END//
DELIMITER ;