const express = require('express');
const {
    httpPost,
    httpGetAll,
    httpGetById,
    httpPut,
    httpDelete
} = require('../../controller/professor');

const professorRouter = express.Router();

professorRouter.get('/', httpGetAll);
professorRouter.get('/:id', httpGetById);
professorRouter.post('/', httpPost);
professorRouter.put('/:id', httpPut);
professorRouter.delete('/:id', httpDelete);

module.exports = professorRouter;
