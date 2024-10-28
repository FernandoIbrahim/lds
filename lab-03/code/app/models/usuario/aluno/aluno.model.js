const Aluno = require('./aluno.sequelize');
const Usuario = require('../usuario.sequelize');
const bcrypt = require('bcryptjs');
const { Error } = require('sequelize');

async function create(nome, email, senha ,endereco, curso, instituicao_id) {


    if(senha){
        const salt = await bcrypt.genSalt(10);
        encryptedSenha = await bcrypt.hash(senha, salt);
    }

    const usuario = await Usuario.create({email, senha: encryptedSenha});

    const aluno = await Aluno.create({
        id: usuario.id,
        nome,
        endereco,
        curso,
        instituicao_id,
    });

    return aluno;

};



async function update(id, nome, email, senha, endereco, curso, instituicao_id) {

    console.log("id")

    const usuario = await Usuario.findByPk(id);
    const aluno = await Aluno.findByPk(id);


    if (!usuario || !aluno) {
        throw new Error('Usuário ou Aluno não encontrado com o id informado!');
    }


    const usuarioUpdateFields = {};
    if (email) {
        usuarioUpdateFields.email = email;
    }
    if (senha) {
        const salt = await bcrypt.genSalt(10);
        usuarioUpdateFields.senha = await bcrypt.hash(senha, salt);
    }


    await usuario.update(usuarioUpdateFields);

    const alunoUpdateFields = {};
    if (nome) alunoUpdateFields.nome = nome;
    if (endereco) alunoUpdateFields.endereco = endereco;
    if (curso) alunoUpdateFields.curso = curso;
    if (instituicao_id) alunoUpdateFields.instituicao_id = instituicao_id;


    await aluno.update(alunoUpdateFields);

    return await aluno; 
}


async function findAll(){

    const alunos = await Aluno.findAll({
        include: Usuario
    });

    return alunos;

};


async function findById(id){
    const aluno = await Aluno.findByPk(id, {
        include: Usuario
    });

    return aluno;
};


async function deleteById(id){
    const findedAluno = await Aluno.findByPk(id);
    const findedUsuario = await Usuario.findByPk(id);

     await findedAluno.destroy();
    return await findedUsuario.destroy();
}

module.exports = {
    create,
    findAll,
    findById,
    update,
    deleteById
}