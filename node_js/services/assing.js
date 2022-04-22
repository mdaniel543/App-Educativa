const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function assign_maestro_curso(req,res){
    let data = req.body;
    const rows = await db.query(
        `CALL materia_asignar_maestro(${data.idCurso},${data.idMaestro})`
    );
    const resp = rows[0];
  if (resp[0].msg_err != "") {
    console.log(resp[0].msg_err);
    return {
      msg: resp[0].msg_err,
    };
  }
  res.json({ msg: resp[0].resp});
}




async function assing_curso_carrera(req,res){
    let data = req.body;
    const rows = await db.query(
        `CALL pensum_asignar(${data.idCurso},${data.idCarrera});`
    );

    const resp = rows[0];
  if (resp[0].msg_err != "") {
    console.log(resp[0].msg_err);
    return {
      msg: resp[0].msg_err,
    };
  }
  res.json({ msg: resp[0].resp});

}

async function assing_alumno_carrera(req,res){
  let data = req.body;
  const rows = await db.query(
      `CALL alumno_asignar_carrera(${data.idCarrera},${data.idAlumno});`
  );

  const resp = rows[0];
if (resp[0].msg_err != "") {
  console.log(resp[0].msg_err);
  return {
    msg: resp[0].msg_err,
  };
}
res.json({ msg: resp[0].resp});

}




module.exports = {
    assign_maestro_curso,
    assing_curso_carrera,
    assing_alumno_carrera,
}