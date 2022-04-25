const db = require("./db");

async function insert(req, res) {
  let data = req.body;
  const rows = await db.query(
    `CALL notificacion_create("${data.titulo}","${data.contenido}",${data.idAlumno},${data.id_materia});`
  );
  const resp = rows[0];
  if (resp[0].msg_err != "") {
    console.log(resp[0].msg_err);
    res.json({ msg: `${resp[0].msg_err}` });
  }
  res.json({ msg: "Notificacion Enviada" });
}

async function notificacion_get_by_materia_id_alumno(req, res) {
  let data = req.body;
  const result = await db.query(
    `CALL notificacion_get_by_alumno_id_materia(${data.idAlumno},${data.idMateria});`
  );
  const resp = result[0];
  res.json(resp);
}

module.exports = {
  insert,
  notificacion_get_by_materia_id_alumno,
};
