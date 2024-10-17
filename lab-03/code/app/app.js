const express = require('express')
const PORT = 3000;

const alunoRouter = require('./routes/aluno/aluno.routes')


const app = express();

app.use('/alunos', alunoRouter);


app.listen(PORT);