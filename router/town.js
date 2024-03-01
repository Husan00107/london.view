const express = require('express');
const multer = require('multer');

const {home,aboutget,aboutdelete,contact,addtown} = require('../controls/town');
const Error = require('../controls/error');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });


router.get('/',home);
router.get('/about',aboutget);
router.delete('/about/:id',aboutdelete);
router.get('/contact',contact);
router.post('/addtown',upload.single('avatar'),addtown);


router.use(Error);

module.exports = router;