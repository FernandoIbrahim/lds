const express = require('express');

const {

    getOwnUserData

} = require('./usuario.controller');

const router = express.Router();

router.get('/me', getOwnUserData);

module.exports = router;