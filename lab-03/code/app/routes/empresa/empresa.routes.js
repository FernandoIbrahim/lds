const express = require('express');
const {

    httpPost,
    httpGetAll,
    httpGetById,
    httpPut,
    httpDelete

} = require('./empresa.controller');

const empresaRouter = express.Router();

empresaRouter.get('/', httpGetAll);
empresaRouter.get('/:id', httpGetById);
empresaRouter.post('/', httpPost);
empresaRouter.put('/:id', httpPut);
empresaRouter.delete('/:id', httpDelete);

module.exports = empresaRouter;