const db = require("./db");
const helper = require("../helper");
const config = require("../config");


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


async function update(req, res){
  console.log(req.body);
  let data = req.body
  var rows = await db.query(
    `CALL alumno_update_delete("1", "${data.Nombre}","${data.Apellido}", "${data.Carnet}", "${data.Telefono}", "${data.Direccion}", "${data.Correo}", "${data.estado}");`
  );
  const resp = rows[0];
  if (resp[0].msg_err != "") {
    console.log(resp[0].msg_err);
    res.json({ msg: `${resp[0].msg_err}` });
  }
  res.json({ msg: "datos actualizado correctamente" });
}

async function delete_(req, res){
  console.log(req.body);
  let data = req.body
  var rows = await db.query(
    `CALL alumno_update_delete("2", "","", "${data.Carnet}", "", "", "", "0");`
  );
  const resp = rows[0];
  if (resp[0].msg_err != "") {
    console.log(resp[0].msg_err);
    res.json({ msg: `${resp[0].msg_err}` });
  }
  res.json({ msg: "dato eliminado correctamente" });
}


async function get_by_id(req,res){
  let data = req.body;
  const result = await db.query(
    `CALL alumno_get_by_id(${data.idAlumno},"${data.carnet}")`
  );
  const resp = result[0];
  res.json(resp[0]);

}

async function selectEstudiantes(page){
  console.log(page)
  const offet = helper.getOffset(page,config.listPerPage);
  const rows = await db.query(
    `CALL alumno_TODO("${offet}","${config.listPerPage}");`
  );

  const data = helper.emptyOrRows(rows);
  const meta = {page};
 
  return {
    data,
    meta
  }
}


module.exports = {
  insert,
  update, 
  delete_,
  get_by_id,
  selectEstudiantes
};
