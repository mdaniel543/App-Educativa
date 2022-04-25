const db = require("./db");

async function entrega_by_id_actividad(req,res){
    let data = req.body;
    const result = await db.query(
      `CALL entrega_by_actividad(${data.idActividad});`
    );
    const resp = result[0];
    res.json(resp);
}

async function actividad_by_alumno(req,res){
    let data = req.body;
    const result = await db.query(
      `CALL actividad_by_alumno(${data.idAlumno}, ${data.idMateria});`
    );
    const resp = result[0];
    res.json(resp);
}

module.exports = {
    entrega_by_id_actividad,
    actividad_by_alumno
}