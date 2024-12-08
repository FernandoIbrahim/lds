const express = require('express');

const {

    getOwnUserData

} = require('../../controller/usuario');

const router = express.Router();

router.get('/', getOwnUserData);

module.exports = router;