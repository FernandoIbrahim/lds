const express = require('express');
const { httpPost, httpGetAll } = require('./transacao.controller');

const router = express.Router();

// Rota para criar uma nova transação
router.post('/', httpPost);
router.get('/', httpGetAll);


module.exports = router;
