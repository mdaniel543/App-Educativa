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

/**
 * POST
 */

async function addUser(educativeApp){
    const result = await db.query(
        `INSERT INTO users (name,lastname) 
        VALUES
        ("${educativeApp.name}","${educativeApp.lastname}")`
    );

    let msg = 'cretating user ERROR';
    if(result.affectedRows){
        msg = 'user created Successfully';
    }

    return {message};
}





module.exports = {
    usuarioPostLogin,
    addUser
}