const express = require('express');
const { append } = require('express/lib/response');
const router = express.Router();
const educative_app = require('../services/educative_app');

const upload = require('../services/upload');
const bulk = require('../services/bulk_load');
const student = require('../services/student');
//const csv = require('fast-csv');
//const multer = require('multer');

/**
 * GET login User
 */

router.get('/test',async function(req,res,next){
    try {
        console.log("this is a test");
        res.json({"message":"ok"});

        //res.json(await educative_app.usuarioPostLogin(req.body))
    } catch (err) {
        console.error(`Error while getting user`,err.message);
        next(err)
    }
});

router.get('/getUsers',async function(req,res,next){
    try {
        res.json(await educative_app.getUsers());
    } catch (err) {
        console.error(`Error during getting Admins`,err.message);
        next(err);
    }
})


/**
 * POST
 */
router.post('/login',async function(req,res,next){
    try {
        res.json(await educative_app.login(req.body));
    } catch (error) {Error
        console.error(`Error during sp login`,next(error));
    }
})


router.post('/adminRegister',async function(req,res,next){
    try {
        res.json(await educative_app.adminRegister(req.body));
    } catch (error) {
        console.error(`Error during sp admin register`,next(error));
    }
})

router.post('/carga', upload);

router.post('/carga_sel', bulk);

router.post('/insert_alumno', student.insert);

router.get('/select_alumno', student.select);

router.put('/update_alumno', student.update);

router.delete('/delete_alumno', student.delete_);

 module.exports = router