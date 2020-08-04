const express = require('express');
const router = express.Router();

const data_controller = require('../controllers/Controller');
//const duo_controller = require('./controllers/duoController');



router.get('/',data_controller.login);

router.get('/index',data_controller.index);

router.get('/stud/new', data_controller.stud_create_get);

router.post('/stud/create', data_controller.stud_create_post);

router.get('/studentlist/:id/delete', data_controller.stud_delete);

router.get('/students', data_controller.stud_list);

//router.get('/duoauth',duo_controller.duo_auth);


module.exports = router;
