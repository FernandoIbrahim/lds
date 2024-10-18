const express = require('express')
const PORT = 3000;

const alunoRouter = require('./routes/aluno/aluno.routes');
const empresaRouter = require('./routes/empresa/empresa.routes');


const app = express();

app.use(express.json());


app.use('/alunos', alunoRouter);
app.use('/empresas', empresaRouter);


app.listen(PORT);