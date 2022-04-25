const db = require("./db");
const helper = require("../helper");
const config = require("../config");

/*



examen_TODO
examen_get_by_id
examen_get_by_materia_id
notificacion_create
notificacion_update_delete
notificacion_get_by_alumno_id
notificacion_create
pregunta_update_delete
pregunta_get_by_examen_id
respuesta_create
respuesta_update_delete
respuesta_get_by_pregunta_id

*/


/**
 * 
 * titulo
 * fecha_publicacion date
 * hora_inicio time
 * hora_fin time
 * id_materia int
 */
async function insert(req, res) {
    console.log(req.body);
    let data = req.body
    var rows = await db.query(
      `CALL examen_create("${data.titulo}","${data.fecha_publicacion}","${data.hora_inicio}","${data.hora_fin}",${data.id_materia});`
    );
    const resp = rows[0];
    if (resp[0].msg_err != "") {
      console.log(resp[0].msg_err);
      return {
        msg: resp[0].msg_err,
      };
    }
    res.json({ msg: res[0].resp });
  }


  /**
 * 
  *tipo_operacion int (1= update, 2 = delete)
  *idExamen varchar
  *Fecha_publicacion date
  *Hora_inicio time
  *hora_fin time
  *estado int  
 */
  async function update(req,res){
    let data = req.body
    var rows = await db.query(
      `CALL actividad_update_delete("1","${data.idExamen}","${data.fecha_publicacion}","${data.hora_inicio}","${data.hora_fin}",${data.Estado});`
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
      `CALL actividad_update_delete(2,"${data.idExamen}","","","",0);`
    );
    const resp = rows[0];
    if (resp[0].msg_err != "") {
      console.log(resp[0].msg_err);
      res.json({ msg: `${resp[0].msg_err}` });
    }
    res.json({ msg: resp[0].resp });
}

async function get(req,res){

    var rows = await db.query(
      `CALL examen_TODO();`
    );
    const resp = rows[0];
    if (resp[0].msg_err != "") {
      console.log(resp[0].msg_err);
      res.json({ msg: `${resp[0].msg_err}` });
    }
    
    res.contentType('aplication/json').status(200);
    res.send(JSON.stringify(resp[0]));
}

async function get_by_id(req,res){
    let data = req.body;
    const result = await db.query(
      `CALL examen_get_by_id("${data.id_str_Examen}")`
    );
    const resp = result[0];
    res.json(resp[0]);
  
  }

  async function get_by_materia(req,res){
    let data = req.body;
    const result = await db.query(
      `CALL examen_get_by_materia_id(${data.idMateria})`
    );
    const resp = result[0];
    res.json(resp[0]);
  
  }



  module.exports = {
      insert,
      update,
      delete_,
      get,
      get_by_id,
      get_by_materia,

      
  }