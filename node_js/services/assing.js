const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function assign_alumno_curso(req,res){
    let data = req.body;
    const rows = await db.query(
        ``
    );
    res.json({});
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


module.exports = {
    assign_alumno_curso,
    assing_curso_carrera,
}