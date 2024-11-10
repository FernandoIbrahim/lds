const Professor = require('./professor.sequelize');
const Usuario = require('../usuario.sequelize');
const { Error } = require('sequelize');

async function create(nome, cpf, materia, instituicao_id ,email, senha) {

    const usuario = await Usuario.create({
        email,
        senha
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


async function update(nome, cpf, materia, instituicao_id ,email, senha) {
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


    await empresa.update(empresaUpdateFields);

    return empresa; 
}


async function findAll(){

    const empresas = await Empresa.findAll({
        include: Usuario
    })

    return empresas;

};


async function findById(id){
    const empresas = await Empresa.findByPk(id, {
        include: Usuario
    });

    return empresas;
};


async function deleteById(id){
    const findedEmpresa = await Empresa.findByPk(id);
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