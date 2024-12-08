const Empresa = require('../../models/empresa');
const Usuario = require('../../models/usuario');
const bcrypt = require('bcryptjs');
const { Error } = require('sequelize');

async function create(nome_fantasia, email,senha ,cnpj) {

    const salt = await bcrypt.genSalt(10);
    hashSenha = await bcrypt.hash(senha, salt); 

    const usuario = await Usuario.create({
        email,
        senha: hashSenha
    });

    const empresa = await Empresa.create({
        id: usuario.id,
        nome_fantasia,
        cnpj
    })

    return empresa;

};


async function update(id, nome_fantasia, email, senha, cnpj) {
    const usuario = await Usuario.findByPk(id);
    const empresa = await Empresa.findByPk(id);

    if (!usuario || !empresa) {
        throw new Error('Usuário ou Empresa não encontrado com o id informado!');
    }


    const usuarioUpdateFields = {};
    if (email) usuarioUpdateFields.email = email; 
    if (senha) {
        const salt = await bcrypt.genSalt(10);
        usuarioUpdateFields.senha = await bcrypt.hash(senha, salt); 
    }


    await usuario.update(usuarioUpdateFields);


    const empresaUpdateFields = {};
    if (nome_fantasia) empresaUpdateFields.nome_fantasia = nome_fantasia;
    if (cnpj) empresaUpdateFields.cnpj = cnpj;


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