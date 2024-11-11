const express = require('express');
const {

    httpPost,
    httpGetAll,
    httpGetById

} = require('./vantagem.controller');

const vantagemRouter = express.Router();

vantagemRouter.post('/', httpPost);
vantagemRouter.get('/', httpGetAll);
vantagemRouter.get('/:id', httpGetById);


module.exports = vantagemRouter;