create TABLE Administrador(
    idAdministrador int auto_increment PRIMARY KEY,
    Nombre varchar(100),
    Pass VARCHAR(100)
);

CREATE TABLE Carrera(
  idCarrera int auto_increment PRIMARY KEY,
  Nombre_carrera varchar(100),
  Descripcion varchar(100),
  Estado int,
  Fecha_creacion datetime
);

CREATE TABLE Materia(
  idMateria int auto_increment PRIMARY KEY,
  Nombre varchar(100),
  Descripcion varchar(100),
  Estado int,
);
-- alter table Materia add column Estado int;

create table Maestro(
  idMaestro int auto_increment PRIMARY KEY,
  Nombre varchar(100),
  Apellido varchar(100),
  Registro varchar(100),
  Telefono varchar(100),
  Direccion varchar(100),
  Correo_electronico varchar(100),
  Fecha_nacimiento date,
  DPI varchar(100),
  Path_foto varchar(300),
  Pass varchar(100),
  Estado int
);

create table Alumno(
    idAlumno int auto_increment PRIMARY KEY,
    Nombre varchar(100),
    Apellido varchar(100),
    Carnet varchar(100),
    Telefono varchar(20),
    Direccion varchar(100),
    Correo_electronico varchar(100),
    Pass varchar(100),
    Estado int,
    idCarrera int,
    foreign KEY(idCarrera) references Carrera(idCarrera)
);

-- alter table Alumno add column idCarrera int;
-- ALTER TABLE Alumno ADD FOREIGN KEY (idCarrera) REFERENCES Carrera(idCarrera);

CREATE TABLE Pensum(
  idMateria int, 
  idCarrera int,
  PRIMARY KEY(idMateria, idCarrera),
  Foreign KEY(idMateria) references Materia(idMateria),
  foreign KEY(idCarrera) references Carrera(idCarrera)
);

CREATE TABLE Asignacion_maestro(
  idMaestro int,
  idMateria int,
  PRIMARY KEY(idMaestro, idMateria),
  Foreign KEY(idMaestro) references Maestro(idMaestro),
  foreign KEY(idMateria) references Materia(idMateria)
);

CREATE table Actividad(
  idActividad int auto_increment PRIMARY KEY,
  Titulo varchar(100),
  Descripcion varchar(100),
  idMateria int,
  Foreign KEY(idMateria) references Materia(idMateria)
);

alter table Actividad add column Fecha_creacion date;
alter table Actividad add column Fecha_publicacion date;
alter table Actividad add column Fecha_entrega date;
alter table Actividad add column Valor decimal(10,2);
alter table Actividad add column Estado int;

create table Publicacion(
  idPublicacion int auto_increment PRIMARY KEY,
  Descripcion varchar(100),
  Fecha_publicacion date,
  idMateria int,
  Foreign KEY(idMateria) references Materia(idMateria)
);

alter table Publicacion add column Estado int;

create table Examen(
  idExamen varchar(100) PRIMARY KEY,
  Fecha_publicacion date,
  Hora_inicio time,
  Hora_fin time,
  idMateria int,
  Foreign KEY(idMateria) references Materia(idMateria)
);

alter table Examen add column Estado int;
alter table Examen add column Fecha_creacion datetime;

create table Pregunta(
  idPregunta int auto_increment PRIMARY KEY,
  Enunciado_pregunta varchar(300),
  idExamen varchar(100),
  Estado int,
  foreign KEY(idExamen) references Examen(idExamen)
);

create table Respuesta(
  idRespuesta int auto_increment PRIMARY KEY,
  Texto_respuesta varchar(300),
  esRespuesta boolean,
  idPregunta int,
  Estado int,
  foreign KEY(idPregunta) references Pregunta(idPregunta)
);

create table Realizacion_examen(
  idAlumno int,
  idExamen varchar(100),
 PRIMARY KEY(idAlumno, idExamen),
 foreign key(idAlumno) references Alumno(idAlumno),
 foreign key(idExamen) references Examen(idExamen)
);

create table Entrega(
  idEntrega int auto_increment PRIMARY KEY,
  idAlumno int,
  Fecha_creacion date,
  Fecha_entrega date,
  Path_archivo varchar(100),
  Estado int,
  Puntuacion float(10,2),
  Obsersvaciones varchar(100),
  foreign key(idAlumno) references Alumno(idAlumno)
);

create table Notificacion(
  idNotificacion int auto_increment PRIMARY KEY,
  Titulo varchar(100),
  Contenido varchar(5000),
  Fecha_hora_publicacion datetime,
  idAlumno int,
  idMateria int,
  Estado int,
  foreign key(idAlumno) references Alumno(idAlumno),
  Foreign KEY(idMateria) references Materia(idMateria)
);
