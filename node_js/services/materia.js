const db = require("./db");

async function insert(req, res) {
  console.log(req.body);
  let data = req.body;
  var rows = await db.query(
    `CALL materia_create('${data.nombre}','${data.descripcion}');`
  );
  const resp = rows[0];
  if (resp[0].msg_err != "") {
    console.log(resp[0].msg_err);
    return {
      msg: resp[0].msg_err,
    };
  }
  res.json({ msg: "Curso insertado correctamente" });
}

async function select(req, res) {
  var rows = await db.query(`CALL materia_TODO();`);
  const resp = rows[0];
  res.json(resp);
}


async function update(req,res){
  let data = req.body;
  const rows = await db.query(
    `CALL materia_update_delete(1,${data.idMateria},"${data.nombre_materia}","${data.descripcion}",${data.estado});`
  );

  const resp = rows[0];
  if (resp[0].msg_err != "") {
    //console.log(resp[0].msg_err);
    res.json({ msg: `${resp[0].msg_err}` });
  }
  res.json({ msg: resp[0].resp });
  

}

async function delete_(req,res){
  let data = req.body;
  const rows = await db.query(
    `CALL materia_update_delete(2,${data.idMateria},"${data.nombre_materia}","",0);`
  );

  const resp = rows[0];
  if (resp[0].msg_err != "") {
    //console.log(resp[0].msg_err);
    res.json({ msg: `${resp[0].msg_err}` });
  }
  res.json({ msg: resp[0].resp });
  
}

async function by_maestro_id(req, res){
  let data = req.body;
    const result = await db.query(
      `CALL materias_get_by_maestro_id(${data.idMaestro});`
    );
    const resp = result[0];
    res.json(resp);
}

module.exports = {
  insert,
  select,
  update,
  delete_,
  by_maestro_id
};
