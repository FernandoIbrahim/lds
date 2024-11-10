const express = require('express');
const {

    httpPost,
    httpGetAll

} = require('./vantagem.controller');

const vantagemRouter = express.Router();

vantagemRouter.post('/', httpPost);
vantagemRouter.get('/', httpGetAll);

module.exports = vantagemRouter;