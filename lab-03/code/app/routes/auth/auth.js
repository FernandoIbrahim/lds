const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../../models/usuario/usuario.sequelize'); // Modelo de usuário
const Empresa = require('../../models/usuario/empresa/empresa.sequelize'); // Modelo de empresa
const Aluno = require('../../models/usuario/aluno/aluno.sequelize'); // Modelo de aluno
const Professor = require('../../models/usuario/professor/professor.sequelize'); // Modelo de professor

const JWT_SECRET = 'sheesh';

async function httpLogin(req, res) {
    const { email, senha } = req.body;

    try {
        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
            return res.status(401).json({ error: 'Usuário não encontrado' });
        }

        const isMatch = await bcrypt.compare(senha, usuario.senha);

        if (!isMatch) {
            return res.status(401).json({ error: 'Senha incorreta' });
        }

        // Verifica o tipo de usuário: empresa, aluno ou professor
        let tipoUser = null;

        // Verifica se o usuário é uma empresa
        const tipoEmpresa = await Empresa.findOne({
            where: { /* outras condições, se necessário */ },
            include: {
                model: Usuario,
                where: { id: usuario.id }, // Verifica se o id do usuário é igual ao id que você tem
                required: true, // Isso garante que só empresas associadas ao usuário sejam retornadas
            },
        });

        // Verifica se o usuário é um aluno
        const tipoAluno = await Aluno.findOne({
            where: { /* outras condições, se necessário */ },
            include: {
                model: Usuario,
                where: { id: usuario.id },
                required: true,
            },
        });

        // Verifica se o usuário é um professor
        const tipoProfessor = await Professor.findOne({
            where: { /* outras condições, se necessário */ },
            include: {
                model: Usuario,
                where: { id: usuario.id },
                required: true,
            },
        });

        // Atribui o tipo de usuário conforme encontrado
        if (tipoEmpresa) {
            tipoUser = "empresa";
        } else if (tipoAluno) {
            tipoUser = "aluno";
        } else if (tipoProfessor) {
            tipoUser = "professor";
        }

        // Gera o token com o tipo de usuário
        const token = jwt.sign(
            { id: usuario.id, email: usuario.email, tipoUser }, // Inclui tipo de usuário no token
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.json({ token, usuario, tipoUser });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao fazer login' });
    }
}

module.exports = {
    httpLogin
}
