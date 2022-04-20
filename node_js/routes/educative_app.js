const express = require('express');
const { append } = require('express/lib/response');
const router = express.Router();
const educative_app = require('../services/educative_app');
const student = require('../services/student')
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


/**
 * CRUD ALUMNO
 */

router.put('/update_delete_alumno',student.update_delete);
router.get('/select_alumno', student.select);
router.get('/alumno_get_by_id',student.get_by_id);


router.get('/selectEstudiantes',async function(req,res,next){
    try {
        res.json(await student.selectEstudiantes(req.query.page));

    }catch(err){
        console.error(`Error while getting students`,err.message);
        next(err);
    }
});


 module.exports = router