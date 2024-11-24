const express = require('express');
const {
    httpPost,
    httpGetAll,
    httpGetById,
    httpPut,
    httpDelete
} = require('./professor.controller');

const professorRouter = express.Router();

professorRouter.get('/', httpGetAll);
professorRouter.get('/:id', httpGetById);
professorRouter.post('/', httpPost);
professorRouter.put('/:id', httpPut);
professorRouter.delete('/:id', httpDelete);

module.exports = professorRouter;
