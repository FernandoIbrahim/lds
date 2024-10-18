const express = require('express');
const {

    httpLogin

} = require('./auth');

const alunoRouter = express.Router();

alunoRouter.post('/login', httpLogin);

module.exports = alunoRouter;