const db = require('./db');
const config = require('../config');
//const bcryptjs = require('bcryptjs');
const res = require('express/lib/response');
const bodyparser = require('body-parser');
const fs = require('fs');
//const csv = require('fast-csv');
//const multer = require('multer');



/**
 * GET 
 * @param {*} user 
 * @returns msg credentials result
 */
async function usuarioPostLogin(user){
    const rows = await db.query(
        `SELECT name,password from usuario WHERE name = '${user.name}'`
    );
    let result = rows;
    const passhash = result[0].password;
    if(passhash == user.password){
        return {
            "user":user.name,
            "message":"credential accepted"
        }
    }
    return {
        "user":user.name,
        "message":"credentials error"
    }
}

async function getUsers(){
    const rows = await db.query(
        `SELECT * FROM Administrador`
    );
    const data = rows;
    return {
        data
    }    
}


/**
 * POST
 */

async function adminRegister(user){
    const rows = await db.query(
        `CALL admin_create('${user.nombre}','${user.pass}');`
    );
    const data = rows;

    return {
        data
    }
}

async function login(user){
    const rows = await db.query(
        `CALL usuario_login('${user.nombre}','${user.pass}','${user.rol}');`
    );
    const resp = rows[0];

    console.log(resp[0].msg_err);

    const aux = {
        "msg":resp[0].msg_err
    }
    if(resp[0].msg_err !== ""){
        return aux
    }

    return {
        "id":resp[0].resp
    }
}


/**
 * UPDATE DELETE ALUMNO
 */

 async function update_delete(alumno){
    const result = await db.query(
        `CALL alumno_update_delete(${alumno.tipo_operacion},"${alumno.nombre}","${alumno.apellido}","${alumno.carnet}","${alumno.telefono}","${alumno.direccion}","${alumno.correo}",${alumno.estado});`
    );
    const resp = rows;

    let msg = 'Error during update_delete procces';
    if (result.affectedRows) message = 'User update_delete successfully';
    return {message};
}




module.exports = {
    usuarioPostLogin,
    getUsers,
    adminRegister,
    login,
}

