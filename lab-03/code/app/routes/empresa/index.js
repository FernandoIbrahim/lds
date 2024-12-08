const express = require('express');
const {

    httpPost,
    httpGetAll,
    httpGetById,
    httpPut,
    httpDelete

} = require('../../controller/empresa');

const empresaRouter = express.Router();

empresaRouter.get('/', httpGetAll);
empresaRouter.get('/:id', httpGetById);
empresaRouter.post('/', httpPost);
empresaRouter.put('/:id', httpPut);
empresaRouter.delete('/:id', httpDelete);

module.exports = empresaRouter;