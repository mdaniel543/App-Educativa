### UNIVERSIDAD DE SAN CARLOS DE GUATEMALA
### FACULTAD DE INGENIERIA
### LABORATORIO SISTEMAS DE BASES DE DATOS 1
### PROYECTO FINAL

#### CHRISTTOPHER JOSE CHITAY COUTIÑO 201113851
#### MARVIN DANIEL RODRIGUEZ FELIZ 2201709450  
#### SERGIO FELIPE ZAPETA 200715274


## MANUAL TECNICO APP EDUCATIVA
- - - -


## DESCRIPCION GENERAL
- - - -

De acuerdo con los requerimientos de la Unidad Académica USAC, este manual fue diseñado para ser usado como una referencia. Este no es un tutorial paso por paso. Y está enfocado en brindar información necesaria para realizar mantenimiento y exploración de la “APP-EDUCATIVA”.
 
El manual ofrece la información necesaria para entender como está construido el software para que el desarrollador (React.js, MySQL, Nodejs) que necesiten dar soporte y mantenimiento al software lo realicen de manera apropiada. También detallar los aspectos técnicos e informativos del Software y así explicar la estructura del aplicativo al personal que quiera administrarlo, editarlo y configurarlo.

## ASPECTOS TÉCNICOS
- - - -

El sistema de APP-EDUCATIVA cuenta con una arquitectura **CLIENTE-SERVIDOR** y se divide en varios módulos con funcionalidades especificas para su máximo desempeño de su diseño.

### Entornos para el Desarrollo del Sistema
- - - -
1.1 React Js

React permite a desarrolladores el crear una gran variedad de aplicaciones web que pueden cambiar información sin necesidad de recargar la pagina. El propósito general de React es ser rápido, escala le y simple. Esto funciona solo en interfaces de usuario.  Esto corresponde a la vista en el  template MVC. Este pude ser usado con combinación de otras librerías de JavaScript o Frameworks tales como Angular JS en MVC.
 
1.2 Nodejs

Node js es primordialmente usado por non-blocking, event-driven servidores, tales como en su simple hilo natural. Este es usado tradicionalmente por web sites y servicios Back-end API, pero fue diseñado con un objetivo de arquitectura real-time, push-based.

1.3 MySQL

MySQL es un administrador de Bases de Datos. Este es utilizado para agregar, administrar y procesar información en una computadora, y este utiliza un un sistema como MySQL Server. MySQL es ideal para almacenar información para aplicaciones web, adicionalmente se necesita una base de datos relacional que es la que almacenara la información a través de multiples tablas. Como MySQL es una base de datos Relacional, es buena para conectar con aplicaciones que tengan una carga pensada en multi transacciones.

## Arquitectura Del Sistema
- - - -

![](https://lh3.googleusercontent.com/_ZwaL-MZa1jabXb_uZoiLFnpxi4FVR2ynmUMrnIjNPVEsEY2gIcgMmdlKbHeagDErcW9UOpoRdKlqkEa2Z8U1obvY0NiKnc8MW1J-3k2-jHYXQcTCkQP7vwBwlWTqWZ3scsRd6Z7PbHZKFsJ8Y6HA1D1P9i6YhHK8yMFk4K4cmqJdZzetOvQFuhfBnlaH4r8UBlePdcQfXeYI3MnzDe9fo8vHH0FxqhaeW9IkewKiczeS3987k-5swD_VlUcMbqfbDgHasBanhrVShSUMeuOqdr4l0i3Zu8HDN6XorhEF15-PhuTzZ9ZWeUwiDkpXdzh-Xco-Yd5tCBkCWu0KbqtKZcaiHXvu6oXBWrwQVWjNPK7xk2MYhxOvJa_8dmdv6fFZWGBcdj3M3kb7_hydQLuqvLg8xe7k6r876PwwsJuw6yWvsvLWZDUphDaR0AgsG09LiQhCt4h9TpnXme2HmgMRX4Pg84tinbcBSMbUz_65g7htSMcUW5B6dTY0Fsuiy6_CB6SuPT21KkJ5Wo8Pu9O3p7IsX2PF72tdvPRkZDSlUko1Z7WDa8EAqtF8bzGGc45pXQTDZPpYwSqS8IQWWpAh6UDZ2eYWC1xA722R-LDsnqfOIpbgcVbZ3_R8Bnaas8Yg_4uEiDMGwGtGSnmI18s0hWdV4BF2JoiQx5bSIj-i3Bzv_pZGss-LchcAunBpZCJkenZxn7FxDTMN1ONr38d5RC-ZjGtqNjhYSZJmDOmGbNnJUXBdR_FyYIujaNm=w1576-h1264-no?authuser=0)


## Roles del sistema
- - - -
En el caso de uso se detalla el rol a desempeñar en relación con la aplicación por parte de las personas relacionadas, en este caso el actor principal es el estudiante, y sus administradores o acompañantes son el administrador y el maestro. 

![](https://lh3.googleusercontent.com/5FBPwAHKPaN9Xf7ejMhvF6ahbXMhcvHq_5GLlX2I11T4jzb7qS6ZS1ACPRFhGV9kihyHgHyk7p68wHLYMnrLtkHrylTPbamFhFr0Ape5jc7rGg7mFze-mVBrm3-PuIjwPFC6mn9oBtGyVvqMKh8EOmjRChnEVSTTIf2BqmMGKSS9BqbPYtxG-Zfu5xHAw52VqS591yceWn6mX4jyprzIxSVU_76c7I-uXTx0ck98kC4-V_C1TBeweUN_OC7Geybid4WQC1yBhAf30FFRvRZMRO973ih3iUs163yaj6kzDmLycKdE7ioD48uZDacW5UJgPU7SB0QLl769U4b_rggcKC7Nw0juEg5XA05rUm8BM7jdvb2FiPc_09yygeYqzteNDjq56J2SNxmVPVJ-8O8LRV4SRmHe67muZRIGfnJeC3fydhk5av460yyAHOH4kkmVxtOzZ6PbDWLOdPdxc_zOfdGzZszJRu3QwxdjQ5SXeXg8TSbLE8c1FMOnEcl7a1p7REiVzJ7eMV4xmdLWc8SiLt9Wj2VWQQgL_4opEKXpA1EsGZuH8NgHCKzEW6MdzueGoEUrlhH-MpmzYtw4xpPXb2vcWbNYJfn6LiGvpcf_7E4pwWEKDqB6IrlmF4x-F9T7UKyG8rTMB8x7cIny8s5GWCYp3xP-mJZkzcvEDuB8I3eZAZQoW9bY_5-BrFAEUKTLaGE9dwzgAeSxg6vANUUs9xQYRTW_O2FNCem_DW6zpXHbpEE96t8-Tf3vvYvI=w845-h819-no?authuser=0)


## MODELO RELACIONAL
- - - -

![](https://lh3.googleusercontent.com/unRJ5bbRYBI9Cy9-xih3fEUJIet-eM6rPT8TPBGG_YGymj4dlrSKvwwExAuCLlaPGkXsNbisO7Yc94PQ840GrddzJ9lGfPhuK4CxnS7rL-bwloVGGe8Ag6sdjQKvzowYc4VarhpRdpous_79OhdJwdGqlHiEtWyBEHz1rEbeDjl1--nlMl3iwVlWiFSj0hqSBqdS3Qecqhu2KpYG7HWOHi-ndSa_Hy8e3UNwrYeN3Y9XR-rjmsenuB8j4Phw8zGQtRgO_gH0Hdv6j_uyPNrM7H6XSffHZRPK2cxHluStb4rDnBJ1mPNoHuW3zqdcOci-70JlyMZR96YQcAnDepjIbIcGapxXTT5_lNc1OUpI7LUZ8G311UzgkBXMjTmArLAs19bOcw1nQCePQbLS7z73_bRdvtnc66uUEjRQik26O_7W4JX-5yguIFWyZezu0u9xhnhiux2HeW3KvtnaiA0paNuALE644kmTnFrzAnO1MZY-lBPf4IiAwQzVM05DYOwqMhrtuBM-sQPM2hYqDsb861UPc4XJVNqOCcTep2hZCj9yEbh9MKsGrJpIVeT3QV16l_hJ3v7Yv7-smuZF4-FRHUtowFV5Sb5CWDSQZW_rvwvqJEtl34QmcPGC1Rcv1VH-Ov4nuh89Oh8RhhoURfmuMb0b9bi2N6KcqOS7A4nn7rROcFmxSqb7nCm5RtaTFqWsWr__92IK-Sa1e6H19uy-pE50G5_baDm6-UAjTgozzv6UH0hkhVEC3ecKeYT6=w1280-h795-no?authuser=0)


## STORE PROCEDURES
- - - -
Para el desarrollo de la aplicación se han implementado procedimientos almacenados para recuperar, modificar y eliminar información en la base de datos. Para el uso de estos no se necesita escribir una sentencia SQL cada vez que se inserte, actualice o elimine información en la Base de Datos.

A continuacion se listan los Procedimientos almacenados utilizados

|  Nombre | Tipo  | Descripcion | Parametros  | Salida  |
| :---    |:----: |:----:       |    :----:   |    ---: |
|usuario_login|Usuario|se utiliza para realizar el login de cualquier usuario registrado, recibe la iniciall del rol|"usuario varchar, pass varchar, rol char ('A', 'E', 'M')"|resp: contiene el id usuario, msg_err: contiene el detalle del error|
|alumno_create|alumno|Se utiliza para la creacion de un alumno dentro de la plataforma|"nombre varchar, apellido varchar, carnet varchar, telefono varchar, direccion varchar, correo varchar, pass varchar"|"resp: contiene el id del alumno, msg_err: contiene el detalle del error"





### Procedimiento almacenado para crear Actividades

```
DELIMITER //
Drop PROCEDURE if EXISTS actividad_create//
CREATE PROCEDURE actividad_create(par_titulo VARCHAR(100), par_descripcion VARCHAR(100),
par_id_materia int, par_fecha_publicacion date, par_fecha_entrega date, par_valor decimal(10,2))
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';
	DECLARE numresp int;

    select COUNT(*) into numresp from Materia where idMateria = par_id_materia;

	if (par_titulo = '' or  par_descripcion = '' or numresp = 0) THEN
		set msg_err = 'Datos incompletos';
	ELSE
		insert into Actividad(Titulo, Descripcion, idMateria, Fecha_creacion, Fecha_publicacion, Fecha_entrega, Valor, Estado)
        values (par_titulo, par_descripcion, par_id_materia, now(), par_fecha_publicacion, par_fecha_entrega, par_valor, 1);

        SELECT LAST_INSERT_ID() into resp;

        Insert into Entrega (IdAlumno, idActividad, Fecha_creacion, Estado)
        Select A.IdAlumno, resp, par_fecha_publicacion, 0 FROM Alumno A
        join Pensum P on P.idCarrera = A.idCarrera
        join Materia M on M.idMateria = P.idMateria
        where M.idMateria = par_id_materia;
	END IF;

	SELECT msg_err, resp;

END//
DELIMITER ;
```

### Crear usuario Administrador
Procedimiento almacenado que permite crear usuarios

```
DELIMITER //
Drop PROCEDURE if EXISTS admin_create//
CREATE PROCEDURE admin_create(par_nombre VARCHAR(100), par_pass VARCHAR(100))
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';

	DECLARE numresp int;

	select COUNT(*) into numresp from Administrador where Nombre = par_nombre;

	if (numresp >0) THEN
		set msg_err = 'usuario ya existe';
	ELSE
		insert into Administrador(Nombre, Pass) values (par_nombre, par_pass);
		SELECT LAST_INSERT_ID() into resp;
	END IF;

	SELECT msg_err, resp;

END //
DELIMITER ;

```


### Actualización y Eliminación de Alumno
El procedimiento permite actualizar o eliminar alumnos dependiendo los parámetros recibidos. 
```
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
```

### Creación de Examen

```
-- examen: Creacion
DELIMITER //
Drop PROCEDURE if EXISTS examen_create//
CREATE PROCEDURE examen_create(par_titulo VARCHAR(100), par_fecha_publicacion date,
par_hora_inicio time, par_hora_fin time, par_id_materia int)
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';
	DECLARE numresp int;

    select COUNT(*) into numresp from Examen where idExamen = par_titulo;

	if (par_titulo = '' or numresp = 1) THEN
		set msg_err = 'Ingresa un titulo diferente';
	ELSE
		insert into Examen(idExamen, Fecha_publicacion, Hora_inicio, Hora_fin, idMateria, Estado, Fecha_creacion) 
        values (par_titulo, par_fecha_publicacion, par_hora_inicio, par_hora_fin, par_id_materia, 1, now());
		
        Insert into Realizacion_examen (IdAlumno, idExamen, nota, estado)
        Select A.IdAlumno, par_titulo, 0, 0 FROM Alumno A 
        join Pensum P on P.idCarrera = A.idCarrera
        join Materia M on M.idMateria = P.idMateria
        where M.idMateria = par_id_materia;

        set resp = 'Examen creado exitosamente';
	END IF;

	SELECT msg_err, resp;

END//
DELIMITER ;
```


### Obtener los exámenes 

```
-- examen obtiene todos los registros de la tabla examen
DELIMITER //
Drop PROCEDURE if EXISTS examen_TODO//
CREATE PROCEDURE examen_TODO()
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';
    DECLARE numresp int;

    select e.*, m.Nombre as Nombre_materia from Examen e
    join Materia m on m.idMateria = e.idMateria;

END//
DELIMITER ;
```

### Creación de Notificación
El procedimiento crea una nueva notificación que permite almacenar para luego poder ser visualizada por los estudiantes.

```
-- notificacion: Creacion
DELIMITER //
Drop PROCEDURE if EXISTS notificacion_create//
CREATE PROCEDURE notificacion_create(par_titulo VARCHAR(100), par_contenido varchar(100),
par_idAlumno int, par_id_materia int)
BEGIN

	DECLARE resp VARCHAR(100) DEFAULT '';
	DECLARE msg_err VARCHAR(100) DEFAULT '';
	DECLARE respAlumno int;
    DECLARE respMateria int;

    select COUNT(*) into respAlumno from Alumno where idAlumno = par_idAlumno;
    select COUNT(*) into respMateria from Materia where idMateria = par_id_materia;

	if (respAlumno = 0 and respMateria = 0) THEN
		set msg_err = 'Datos no encontrados';
	ELSE
		insert into Notificacion(Titulo, Contenido, Fecha_hora_publicacion, idAlumno, idMateria, Estado) 
        values (par_titulo, par_contenido,now(), par_idAlumno, par_id_materia,1);
		set resp = 'notificacion creado exitosamente';
	END IF;

	SELECT msg_err, resp;

END//
DELIMITER ;
```


### Creación de Pregunta
El procedimiento permite crear preguntas para ser relacionada con un examen.

```
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
```

### Creación de Respuesta
El procedimiento permite crear respuestas que corresponden a una pregunta de un examen.

```
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
```



### Nodejs API Rest
- - - -
Una REST API también conocida como RESTful API es una aplicación de programación interfaz o API, que permite interactuar con servicios web.

La siguiente API permite obtener todas las actividades de los estudiantes por materia. Esto en conjunto con el procedimiento almacenado “alumnos_get_by_id_materia(materia_id)” crean la funcionalidad del maestro-ver notas de estudiantes. 

```
async function getActividades_students(req,res){
  let data = req.body;
  const alumnos = await db.query(
    `CALL alumnos_get_by_id_materia(${data.materia_id})`
  );
  const students = [];
  await asynForEach(alumnos[0],async (alumno) =>{
    //here i dadd a student info
    const actividades = await db.query(
      `CALL actividad_by_alumno( ${alumno.idAlumno} , ${data.materia_id} );`
    );
    let Notas = []
    let Total = 0;
    actividades[0].map(actividad =>{  
      
      let actividadSchema ={
        "idEntrega":actividad.idEntrega,
        "Path_archivo":actividad.Path_archivo,
        "Estado":actividad.Estado,
        "Puntuacion": parseFloat(actividad.Puntuacion).toFixed(2) ,
        "idActividad":actividad.idActividad,
        "Titulo":actividad.Titulo,
        "Descripcion":actividad.Descripcion,
        "Valor": actividad.Valor,
        "Estado":actividad.Estado
      }

      Notas.push(actividadSchema);    
      Total += actividad.Puntuacion;
    })
    
    const result2 = await db.query(
      `CALL examen_get_by_materia_id_alumno_2(${data.materia_id}, ${alumno.idAlumno})`
    );
  
    result2[0].map(examen =>{
      Notas.push(examen);
      Total += examen.Puntuacion;
    });

    let studentSchema = {
      "idAlumno": alumno.idAlumno,
      "Nombre": alumno.Nombre,
      "Apellido": alumno.Apellido,
      "Carnet": alumno.Carnet,
      "Telefono": alumno.Telefono,
      "Direccion":alumno.Direccion,
      "Correo_electronico":alumno.Correo_electronico,
      "Pass": alumno.Pass,
      "Estado": alumno.Estado,
      "idCarrera":alumno.idCarrera,
      "Actividades":Notas,
      "Nota": parseFloat(Total).toFixed(2)
    }
    students.push(studentSchema);
  })
  console.log(students)
  res.contentType('aplication/json').status(200);
  res.send(JSON.stringify(students));
}
```