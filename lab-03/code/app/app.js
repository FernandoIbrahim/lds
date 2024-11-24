const express = require('express');
const cors = require('cors');
const PORT = 3000;

const authRouter = require('./routes/auth/auth.router')
const alunoRouter = require('./routes/aluno/aluno.routes');
const empresaRouter = require('./routes/empresa/empresa.routes');
const vantagensRouter = require('./routes/vantagem/vatagem.router');
const transacaoRouter = require('./routes/transacao/transacao.router');
const userRouter = require('./routes/usuario/usuario.router');
<<<<<<< HEAD
const uploadRouter = require('./routes/uploads/uploads.router');
=======
const professorRouter = require('./routes/professor/professor.routes');
>>>>>>> d909e03c3db884b8b747f0d066f7cec3dbb1d166

const app = express();

app.use(express.json());
app.use(cors());

app.use('/alunos', alunoRouter);
app.use('/empresas', empresaRouter);
app.use('/auth', authRouter);
app.use('/vantagens', vantagensRouter)
app.use('/transacao', transacaoRouter)
app.use('/user', userRouter);
app.use('/professores', professorRouter)

app.use('/uploads', express.static('uploads'));
app.use('/api', uploadRouter);

app.listen(PORT);
console.log("rodando na porta " + PORT)