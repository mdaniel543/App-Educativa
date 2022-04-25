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
    res.json({ msg: "Actividad Creada correctamente" });
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
      `CALL actividad_update_delete(2,${data.idActividad},"", "","2000/10/10", "2000/10/10", 0.0,0);`
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

async function actividad_get_by_materia_id(req,res){
  let data = req.body;
  const result = await db.query(
    `CALL actividad_get_by_materia_id(${data.idMateria});`
  );
  const resp = result[0];
  res.json(resp);
}

async function getActividades_by_student(req,res){
  let data = req.body;
  const result = await db.query(
    `CALL actividad_by_alumno(${data.alumno_id},${data.materia_id});`
  );
  let Notas = []
  let Total = 0;
  console.log(result)
  result[0].map(actividad =>{  
    let actividadSchema ={
      "Materia":actividad.Nombre,
      "Actividad":actividad.Titulo,
      "Nota":actividad.Puntuacion
    }
    Notas.push(actividadSchema);    
    Total += actividad.Puntuacion;
  })
  let _actividades = {
    "Actividades":Notas,
    "Total": Total
  }
  console.log(_actividades);
  res.contentType('aplication/json').status(200);
  res.send(JSON.stringify(_actividades));
}


async function updateEntregaStudent(req,res){
  let data = req.body
  console.log(data)
  var rows = await db.query(
    `CALL entrega_update_alumno(${data.entrega_id},"${data.path_file}");`
  );
  const resp = rows[0];
  if (resp[0].msg_err != "") {
    console.log(resp[0].msg_err);
    res.json({ msg: `${resp[0].msg_err}` });
  }
  res.json({ msg: resp[0].resp });
}


module.exports = {
    update,
    delete_,
    insert,
    selectActividades,
    actividad_by_id,
    selectActividades,
    actividad_get_by_materia_id,
    getActividades_by_student,
    updateEntregaStudent
}
