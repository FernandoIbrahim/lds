const Professor = require('../../models/professor');
const Usuario = require('../../models/usuario');
const bcrypt = require('bcryptjs');

const { Error } = require('sequelize');

async function create(nome, cpf, materia, instituicao_id ,email, senha) {

    const salt = await bcrypt.genSalt(10);
    hashSenha = await bcrypt.hash(senha, salt); 

    const usuario = await Usuario.create({
        email,
        senha: hashSenha,
        pontos: 1000
    });

    const professor = await Professor.create({
        id: usuario.id,
        cpf,
        nome,
        materia,
        instituicao_id
    })

    return professor;

};


async function update(id, nome, cpf, materia, instituicao_id ,email, senha) {
    const usuario = await Usuario.findByPk(id);
    const professor = await Professor.findByPk(id);

    if (!usuario || !professor) {
        throw new Error('Usuário ou Professor não encontrado com o id informado!');
    }


    const usuarioUpdateFields = {};
    if (email) usuarioUpdateFields.email = email; 
    if (senha) {
        const salt = await bcrypt.genSalt(10);
        usuarioUpdateFields.senha = await bcrypt.hash(senha, salt); 
    }


    await usuario.update(usuarioUpdateFields);


    const professorUpdateFields = {};
    if (nome) professorUpdateFields.nome = nome;
    if (cpf) professorUpdateFields.cpf = cpf;
    if(materia) professorUpdateFields.materia = materia;
    if(instituicao_id) professorUpdateFields.instituicao_id = instituicao_id;


    await professor.update(professorUpdateFields);

    return professor; 
}


async function findAll(){

    const empresas = await Professor.findAll({
        include: Usuario
    })

    return empresas;

};


async function findById(id){
    const empresas = await Professor.findByPk(id, {
        include: Usuario
    });

    return empresas;
};


async function deleteById(id){
    const findedEmpresa = await Professor.findByPk(id);
    const findedUsuario = await Usuario.findByPk(id);

     await findedEmpresa.destroy();
    return await findedUsuario.destroy();
}

module.exports = {
    create,
    findAll,
    findById,
    update,
    deleteById
}