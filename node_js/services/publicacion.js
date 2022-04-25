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

async function update(req,res){
    let data = req.body
    var rows = await db.query(
      `CALL publicacion_update_delete(1,${data.idPublicacion}, "${data.descripcion}", 1);`
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
        `CALL publicacion_update_delete(2,${data.idPublicacion},"", 0);`
      );
      const resp = rows[0];
      if (resp[0].msg_err != "") {
        console.log(resp[0].msg_err);
        res.json({ msg: `${resp[0].msg_err}` });
      }
      res.json({ msg: resp[0].resp });
  }

module.exports = {
  insert,
  publicacion_get_by_materia_id,
  update,
  delete_
};
