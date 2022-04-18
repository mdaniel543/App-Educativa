create TABLE Administrador(
    idAdministrador int auto_increment PRIMARY KEY,
    Nombre varchar(100),
    Pass VARCHAR(100)
);

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
  Pass varchar(100)
);

create table Alumno(
    idAlumno int auto_increment PRIMARY KEY,
    Nombre varchar(100),
    Apellido varchar(100),
    Carnet varchar(100),
    Telefono varchar(20),
    Direccion varchar(100),
    Correo_electronico varchar(100),
    Pass varchar(100)
)