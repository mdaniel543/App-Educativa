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

module.exports = {
  insert,
  select,
};
