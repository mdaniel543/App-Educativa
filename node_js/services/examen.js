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

 async function asynForEach(array,callback){
    for (let index = 0; index < array.length; index++) {
      await callback(array[index],index,array);
    }
  }


async function insert(req, res) {
  console.log(req.body);
  let data = req.body;
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
  res.json({ msg: resp[0].resp });
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
async function update(req, res) {
  let data = req.body;
  var rows = await db.query(
    `CALL pregunta_update_delete("1","${data.idExamen}","${data.fecha_publicacion}","${data.hora_inicio}","${data.hora_fin}",${data.Estado});`
  );
  const resp = rows[0];
  if (resp[0].msg_err != "") {
    console.log(resp[0].msg_err);
    res.json({ msg: `${resp[0].msg_err}` });
  }
  res.json({ msg: resp[0].resp });
}

async function delete_(req, res) {
  let data = req.body;
  var rows = await db.query(
    `CALL pregunta_update_delete(2,"${data.idExamen}","","","",0);`
  );
  const resp = rows[0];
  if (resp[0].msg_err != "") {
    console.log(resp[0].msg_err);
    res.json({ msg: `${resp[0].msg_err}` });
  }
  res.json({ msg: resp[0].resp });
}

async function get(req, res) {
  var rows = await db.query(`CALL examen_TODO();`);
  const resp = rows[0];
  if (resp[0].msg_err != "") {
    console.log(resp[0].msg_err);
    res.json({ msg: `${resp[0].msg_err}` });
  }

  res.contentType("aplication/json").status(200);
  res.send(JSON.stringify(resp[0]));
}

async function get_by_id(req, res) {
  let data = req.body;
  const result = await db.query(
    `CALL examen_get_by_id("${data.id_str_Examen}")`
  );
  const resp = result[0];
  res.json(resp[0]);
}

async function get_by_materia(req, res) {
  let data = req.body;
  const result = await db.query(
    `CALL examen_get_by_materia_id(${data.idMateria})`
  );
  const resp = result[0];
  res.json(resp);
}
/*
respuesta_create
respuesta_update_delete
respuesta_get_by_pregunta_id
*/

/**
 *
 * par_enunciado varchar(100),ç varchar(100))
 */
async function insert_pregunta(req, res) {
  let data = req.body;
  const resp = await db.query(
    `CALL pregunta_create("${data.par_enunciado}","${data.examen}");`
  );
  console.log(resp[0][0].resp);
  res.json({ msg: resp[0][0].resp });
}

async function update_pregunta(req, res) {
  let data = req.body;
  var rows = await db.query(
    `CALL pregunta_update_delete("1",${data.idPregunta},"${data.enunciado_pregunta}",${data.Estado});`
  );
  const resp = rows[0];
  if (resp[0].msg_err != "") {
    console.log(resp[0].msg_err);
    res.json({ msg: `${resp[0].msg_err}` });
  }
  res.json({ msg: resp[0].resp });
}

async function delete_pregunta(req, res) {
  let data = req.body;
  var rows = await db.query(
    `CALL pregunta_update_delete("2",${data.idPregunta},"",0;`
  );
  const resp = rows[0];
  if (resp[0].msg_err != "") {
    console.log(resp[0].msg_err);
    res.json({ msg: `${resp[0].msg_err}` });
  }
  res.json({ msg: resp[0].resp });
}

async function pregunta_get_by_examen_id(req, res) {
  let data = req.body;
  console.log(data);
  const result = await db.query(
    `CALL pregunta_get_by_examen_id("${data.examen}");`
  );
  const resp = result[0];
  res.json(resp);
}

async function insert_respuesta(req, res) {
  let data = req.body;
  console.log(data);
  const resp = await db.query(
    `CALL respuesta_create("${data.respuesta}",${data.es_respuesta},${data.id_pregunta});`
  );
  res.json({ msg: resp[0][0].resp });
}

async function update_respuesta(req, res) {
  let data = req.body;
  var rows = await db.query(
    `CALL respuesta_update_delete("1",${data.idRespuesta},"${data.texto_respuesta}","${data.es_respuesta}",${data.Estado});`
  );
  const resp = rows[0];
  if (resp[0].msg_err != "") {
    console.log(resp[0].msg_err);
    res.json({ msg: `${resp[0].msg_err}` });
  }
  res.json({ msg: resp[0].resp });
}

async function delete_respuesta(req, res) {
  let data = req.body;
  var rows = await db.query(
    `CALL respuesta_update_delete("2",${data.idRespuesta},"","",0;`
  );
  const resp = rows[0];
  if (resp[0].msg_err != "") {
    console.log(resp[0].msg_err);
    res.json({ msg: `${resp[0].msg_err}` });
  }
  res.json({ msg: resp[0].resp });
}

async function get_respuesta_by_id(req, res) {
  let data = req.body;
  const result = await db.query(
    `CALL respuesta_get_by_pregunta_id(${data.idPregunta})`
  );
  res.json(result[0]);
}

async function get_examen_preguntas_respuestas(req, res) {
  let data = req.body;
  const result = await db.query(
    `CALL pregunta_get_by_examen_id("${data.examen}");`
  );
  //console.log(result[0])
  const preguntas = [];
  await asynForEach(result[0], async (pregunta) => {
    //here i dadd a student info
    const respuestas = await db.query(
      `CALL respuesta_get_by_pregunta_id(${pregunta.idPregunta})`
    );
    //console.log(respuestas[0])
    let resp = [];

    await respuestas[0].map((respuesta) => {
      resp.push(respuesta);
    });
    
    let studentSchema = {
        "pregunta": pregunta,
        "resp": resp
    };
    preguntas.push(studentSchema);
  });
  console.log(preguntas);
  res.send(JSON.stringify(preguntas));
}


async function asynForEach(array,callback){
    for (let index = 0; index < array.length; index++) {
      await callback(array[index],index,array);
    }
  }

async function get_nota_examen(req,res){
    let data = req.body;
    //id alumno id examen
    const arreglo = data.arreglo;
    let total = 0;
    let count = 0;
    await asynForEach(arreglo,async (item)=>{
        
        const result = await db.query(
            `CALL respuesta_get(${item.idRespuesta});`
        );
        count ++;
        if(result[0][0].esRespuesta){
            total ++;
        }
    })

    let resultado = {
        "Preguntas": count,
        "Total": total
    }
    
    res.send(JSON.stringify(resultado));
}



module.exports = {
  insert,
  update,
  delete_,
  get,
  get_by_id,
  get_by_materia,
  insert_pregunta,
  update_pregunta,
  delete_pregunta,
  pregunta_get_by_examen_id,
  insert_respuesta,
  update_respuesta,
  delete_respuesta,
  get_respuesta_by_id,
  get_examen_preguntas_respuestas,
  get_nota_examen
};
