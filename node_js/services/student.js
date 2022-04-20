const db = require("./db");

async function insert(req, res) {
  console.log(req.body);
  let data = req.body
  var rows = await db.query(
    `CALL alumno_create('${data.Nombre}','${data.Apellido}','${data.Carnet}', '${data.Telefono}', '${data.Direccion}', '${data.Correo}', '${data.Pass}');`
  );
  const resp = rows[0];
  if (resp[0].msg_err != "") {
    console.log(resp[0].msg_err);
    return {
      msg: resp[0].msg_err,
    };
  }
  res.json({ msg: "datos cargados correctamente" });
}

module.exports = {
  insert,
};
