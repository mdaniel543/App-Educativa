const mysql = require("mysql2/promise");
const config = require("../config");
const db = require('./db');
var moment = require('moment');  

async function carga(req, res) {
  var data = req.body;
  console.log(data);

  var inputFile = `upload/${data.ruta}`;

  const csvFilePath = inputFile;
  const csv = require("csvtojson");
  csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {});

  const jsonArray = await csv().fromFile(csvFilePath);
  //console.log(jsonArray)

  if (data.user === "Maestro") {
    await carga_maestros(jsonArray);
  } else if (data.user === "Alumno") {
    await carga_alumnos(jsonArray);
  }
  res.json({ msg: "datos cargados correctamente" });
}

async function carga_maestros(data) {
  const connection = await mysql.createConnection(config.db);
  // var pool = mysql.createPool(config.db);
  await data.map(async (maestro) => {
    let fecha = moment(maestro.FechaNacimiento, "MM/DD/YYYY").format('YYYY/MM/DD');
    if (fecha == "Invalid date") fecha = moment(maestro.FechaNacimiento, "MM-DD-YY").format('YYYY/MM/DD');
    //console.log(fecha)
    var rows = await db.queryOnly( connection, 
      `CALL maestro_create("${maestro.Nombre}","${maestro.Apellido}", "${maestro.id}", "${maestro.Telefono}", "${maestro.Direccion}", "${maestro.Correo}", "${fecha}", "${maestro.DPI}", "", "${maestro.Contrasena}" );`
    );
    const resp = rows[0];
    if (resp[0].msg_err != "") {
      console.log(resp[0].msg_err);
      return {
        msg: resp[0].msg_err,
      };
    }
  });

}

async function carga_alumnos(data) {
  const connection = await mysql.createConnection(config.db);
  // var pool = mysql.createPool(config.db);
  await data.map(async (alumno) => {
    var rows = await db.queryOnly( connection, 
      `CALL alumno_create("${alumno.Nombre}","${alumno.Apellido}","${alumno.Carnet}", "${alumno.Telefono}", "${alumno.Direccion}", "${alumno.Correo}", "${alumno.Contrasena}");`
    );
    const resp = rows[0];
    if (resp[0].msg_err != "") {
      console.log(resp[0].msg_err);
      return {
        msg: resp[0].msg_err,
      };
    }
  });
}

module.exports = carga;
