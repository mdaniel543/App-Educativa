const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function insert(req,res){
    let data = req.body;
    const rows = await db.query(
        `CALL actividad_create("${data.titulo}","${data.descripcion}",${data.id_materia},"${data.fecha_publicacion}","${data.fecha_entrega}",${data.valor});`
    );
    const resp = rows[0];
    if (resp[0].msg_err != "") {
        console.log(resp[0].msg_err);
        res.json({ msg: `${resp[0].msg_err}` });
    }
    res.json({ msg: "datos actualizado correctamente" });
}


async function update(req,res){
  let data = req.body
  var rows = await db.query(
    `CALL actividad_update_delete("1",${data.idActividad},"${data.titulo}", "${data.descripcion}",${data.id_materia}, "${data.fecha_publicacion}", "${data.fecha_entrega}",${data.valor},${data.estado});`
  );
  const resp = rows[0];
  if (resp[0].msg_err != "") {
    console.log(resp[0].msg_err);
    res.json({ msg: `${resp[0].msg_err}` });
  }
  res.json({ msg: resp[0].resp });
}

async function delete_(req,res){
    let data = req.body
    var rows = await db.query(
      `CALL actividad_update_delete("2",${data.idActividad},"", "","", "", "","","0");`
    );
    const resp = rows[0];
    if (resp[0].msg_err != "") {
      console.log(resp[0].msg_err);
      res.json({ msg: `${resp[0].msg_err}` });
    }
    res.json({ msg: resp[0].resp });
}

async function selectActividades(req,res){
    let data = req.body;
    const rows = await db.query(
        `CALL actividad_TODO();`       
    );
    const resp = rows[0];
    res.json(resp);
}

async function actividad_by_id(req,res){
    let data = req.body;
    const result = await db.query(
      `CALL actividad_get_by_id(${data.id_actividad});`
    );
    const resp = result[0];
    res.json(resp[0]);
}

module.exports = {
    update,
    delete_,
    insert,
    selectActividades,
    actividad_by_id,
    selectActividades
}
