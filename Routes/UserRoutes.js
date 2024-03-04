const { AddUser, LoginUser } = require('../Controller/UserController');
const express = require('express');

const router = express.Router();

router.post('/AddUser', AddUser);
router.post('/LoginUser', LoginUser);


module.exports = router; 