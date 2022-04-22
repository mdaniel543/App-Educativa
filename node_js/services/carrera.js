const db = require("./db");

async function insert(req, res) {
  console.log(req.body);
  let data = req.body;
  var rows = await db.query(
    `CALL carrera_create('${data.nombre}','${data.descripcion}');`
  );
  const resp = rows[0];
  if (resp[0].msg_err != "") {
    console.log(resp[0].msg_err);
    return {
      msg: resp[0].msg_err,
    };
  }
  res.json({ msg: "Carrera insertada correctamente" });
}

async function select(req, res) {
  var rows = await db.query(`CALL carrera_TODO();`);
  const resp = rows[0];
  res.json(resp);
}

async function update(req,res){
  //console.log(req.body);
  let data = req.body;
  const rows = await db.query(
    `CALL carrera_update_delete(1,${data.idCarrera},"${data.nombre_carrera}","${data.descripcion}",${data.estado});`
  );
  const resp = rows[0];
  if (resp[0].msg_err != "") {
    console.log(resp[0].msg_err);
    res.json({ msg: `${resp[0].msg_err}` });
  }
  res.json({ msg: resp[0].resp });
}

async function delete_(req,res){
  let data = req.body;
  var rows = await db.query(
    `CALL carrera_update_delete(2,${data.idCarrera},"","",0);`
  );
  const resp = rows[0];
  if (resp[0].msg_err != "") {
    console.log(resp[0].msg_err);
    res.json({ msg: `${resp[0].msg_err}` });
  }
  res.json({ msg: resp[0].resp});

}

async function get_by_id(req,res){
  let data = req.body;
  const result = await db.query(
    `CALL carrera_get_by_id(${data.idCarrera},"${data.Nombre_carrera}");`
  );
  const resp = result[0];
  res.json(resp[0]);
}


module.exports = {
  insert,
  select,
  update,
  delete_,
  get_by_id,
};
