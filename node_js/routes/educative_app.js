const express = require('express');
const { append } = require('express/lib/response');
const router = express.Router();
const educative_app = require('../services/educative_app');
const upload = require('../services/upload');
const bulk = require('../services/bulk_load');
const student = require('../services/student');
const professor = require('../services/profesor');

const carrera = require('../services/carrera');
const materia = require('../services/materia');
const asignacion = require('../services/assing');

const actividad =require('../services/actividad');
const publicacion = require('../services/publicacion');

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


/**
 * CRUD ALUMNO
 */

router.post('/alumno_get_by_id',student.get_by_id);


router.post('/selectEstudiantes',async function(req,res,next){
    try {
        res.json(await student.selectEstudiantes(req.body.page));

    }catch(err){
        console.error(`Error while getting students`,err.message);
        next(err);
    }
});

router.post('/insert_alumno',student.insert);

router.put('/update_alumno', student.update);

router.delete('/delete_alumno', student.delete_);


/**
 * CRUD MAESTRO
 */

router.post('/insert_maestro',professor.insert);

router.post('/maestro_get_by_id',professor.get_by_id);

router.post('/selectMaestros',async function(req,res,next){
    try {
        res.json(await professor.selectMaestros(req.body.page));

    }catch(err){
        console.error(`Error while getting professors`,err.message);
        next(err);
    }
});

router.put('/update_maestro',professor.update);

router.delete('/delete_maestro',professor.delete_);

/**
 * CARRERAS
 */

router.post('/insert_carrera', carrera.insert);

router.get('/Select_Carrera', carrera.select);

router.put('/update_carrera', carrera.update);

router.delete('/delete_carrera', carrera.delete_);

router.post('/carrera_get_by_id',carrera.get_by_id);

router.post('/materias_get_by_carrera_id',carrera.get_cursos);

/**
 * CURSOS
 */

router.post('/insert_curso', materia.insert);

router.get('/Select_Cursos', materia.select);

router.put('/update_curso',materia.update);

router.delete('/delete_curso',materia.delete_);

router.post('/materias_get_by_maestro_id', materia.by_maestro_id)

/**
 * ASIGNACION
 */

router.post('/assign_curso_carrera',asignacion.assing_curso_carrera);

router.post('/assign_maestro_curso',asignacion.assign_maestro_curso);

router.post('/assign_alumno_carrera',asignacion.assing_alumno_carrera);


/**
 * ACTIVIDAD
 */

router.post('/insert_actividad',actividad.insert);

router.post('/actividad_get_by_materia_id',actividad.actividad_get_by_materia_id);

router.get('/get_actividad_by_id',actividad.actividad_by_id);

router.put('/update_actividad',actividad.update);

router.delete('/delete_actividad',actividad.delete_);

router.get('/get_actividades',actividad.selectActividades);


/*
Publicacion
*/ 

router.post('/publicacion_get_by_materia_id', publicacion.publicacion_get_by_materia_id);
router.post('/publicacion_insert', publicacion.insert);
router.put('/publicacion_update', publicacion.update);
router.put('/publicacion_delete', publicacion.delete_)

 module.exports = router