const express = require('express');
const { append } = require('express/lib/response');
const router = express.Router();
const educative_app = require('../services/educative_app');
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


/**
 * POST
 */
router.post('/addUser',async function(req,res,next){
    try {
        res.json(await educative_app.addUser(req.body));
    } catch (error) {
        console.error(`Error during add user proccess`,next(error));
    }
})




 module.exports = router