const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function insert(req, res) {
    console.log(req.body);
    let data = req.body
    var rows = await db.query(
      `CALL maestro_create('${data.Nombre}','${data.Apellido}','${data.Registro}', '${data.Telefono}', '${data.Direccion}', '${data.Correo}','${data.fecha_nacimiento}','${data.dpi}','${data.path_foto}','${data.pass}');`
    );
    const resp = rows[0];
    if (resp[0].msg_err != "") {
      console.log(resp[0].msg_err);
      res.json({ msg: `${resp[0].msg_err}` });
    }
    res.json({ msg: "datos cargados correctamente" });
  }


  async function update(req, res){
    console.log(req.body);
    let data = req.body
    var rows = await db.query(
      `CALL maestro_update_delete("1", "${data.Nombre}","${data.Apellido}", "${data.Registro}", "${data.Telefono}", "${data.Direccion}","${data.Correo}","${data.Fecha_nacimiento}","${data.Dpi}","${data.Path_foto}", "${data.Estado}");`
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
      `CALL maestro_update_delete("2", "","", "${data.Registro}", "", "","","","","", "0");`
    );
    const resp = rows[0];
    if (resp[0].msg_err != "") {
      console.log(resp[0].msg_err);
      res.json({ msg: `${resp[0].msg_err}` });
    }
    res.json({ msg: "registro eliminado correctamente" });
  }

  async function get_by_id(req,res){
    let data = req.body;
    const result = await db.query(
      `CALL maestro_get_by_id(${data.idMaestro},"${data.Registro}")`
    );
    const resp = result[0];
    res.json(resp[0]);
  
  }

  async function selectMaestros(page =1){
    const offet = helper.getOffset(page,config.listPerPage);
    const rows = await db.query(
      `CALL maestro_TODO("${offet}","${config.listPerPage}");`
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
    selectMaestros
}