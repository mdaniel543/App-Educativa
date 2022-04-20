const db = require("./db");
const helper = require("../helper");
const config = require("../config");


async function insert(req, res) {
  console.log(req.body);
  let data = req.body
  var rows = await db.query(
    `CALL alumno_create('${data.Nombre}','${data.Apellido}','${data.Carnet}', '${data.Telefono}', '${data.Direccion}', '${data.Correo}', '${data.Pass}');`
  );
  const resp = rows[0];
  if (resp[0].msg_err != "") {
    console.log(resp[0].msg_err);
    return {
      msg: resp[0].msg_err,
    };
  }
  res.json({ msg: "datos cargados correctamente" });
}

async function select(req, res) {
    console.log('gola')
    var rows = await db.query(
      `CALL alumno_TODO();`
    );
    //console.log(rows[0])
    res.json(rows[0]);
}


async function selectEstudiantes(page =1){
  const offet = helper.getOffset(page,config.listPerPage);
  const rows = await db.query(
    `CALL alumno_TODO("${offet}","${config.listPerPage}");`
  );

  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}


async function update_delete(req,res){
  let data = req.body;
  const result = await db.query(
      `CALL alumno_update_delete(${data.tipo_operacion},"${data.nombre}","${data.apellido}","${data.carnet}","${data.telefono}","${data.direccion}","${data.correo}",${data.estado});`
  );
  const resp = result[0];
  if(resp[0].msg_err != ""){
    console.log(resp[0].msg_err);
    return{
      msg: resp[0].msg_err,
    };
  }

  if(data.tipo_operacion ==1){
      res.json({
        msg:"registro acutalizado"
      });
  }else{
    res.json({
      msg: "registro eliminado"
    });  
  }
}

async function get_by_id(req,res){
  let data = req.body;
  const result = await db.query(
    `CALL alumno_get_by_id(${data.idAlumno},"${data.carnet}")`
  );
  const resp = result[0];
  res.json(resp[0]);

}

module.exports = {
  insert,
  select,
  update_delete,
  get_by_id,
  selectEstudiantes
};
