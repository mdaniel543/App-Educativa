const db = require("./db");

async function insert(req, res) {
  let data = req.body;
  const rows = await db.query(
    `CALL publicacion_create("${data.descripcion}",${data.id_materia});`
  );
  const resp = rows[0];
  if (resp[0].msg_err != "") {
    console.log(resp[0].msg_err);
    res.json({ msg: `${resp[0].msg_err}` });
  }
  res.json({ msg: "Publicacion Creada correctamente" });
}

async function publicacion_get_by_materia_id(req, res) {
  let data = req.body;
  const result = await db.query(
    `CALL publicacion_get_by_materia_id(${data.idMateria});`
  );
  const resp = result[0];
  res.json(resp);
}

module.exports = {
  insert,
  publicacion_get_by_materia_id,
};
