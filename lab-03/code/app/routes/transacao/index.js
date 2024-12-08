const express = require('express');
const { httpPost, httpGetAll, httpGetById } = require('../../controller/transacao');

const router = express.Router();

// Rota para criar uma nova transação
router.get('/', httpGetAll);
router.get('/:id', httpGetById);
router.post('/', httpPost);


module.exports = router;
