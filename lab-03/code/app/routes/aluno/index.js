const express = require('express');
const {

    httpPost,
    httpGetAll,
    httpGetById,
    httpPut,
    httpDelete

} = require('../../controller/aluno');

const alunoRouter = express.Router();

alunoRouter.get('/', httpGetAll);
alunoRouter.get('/:id', httpGetById);
alunoRouter.post('/', httpPost);
alunoRouter.put('/:id', httpPut);
alunoRouter.delete('/:id', httpDelete);

module.exports = alunoRouter;