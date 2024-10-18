const Empresa = require('./empresa.sequelize');
const Usuario = require('../usuario.sequelize');
const { Error } = require('sequelize');

async function create(nome_fantasia, email,senha ,cnpj) {

    const usuario = await Usuario.create({
        email,
        senha
    });

    const empresa = await Empresa.create({
        id: usuario.id,
        nome_fantasia,
        cnpj
    })

    return empresa;

};


async function update(id, nome_fantasia, email,senha ,cnpj){

    const usuario = await Usuario.findByPk(id);
    const empresa = await Empresa.findByPk(id);

    usuario.set({
        email,
        senha
    })

    empresa.set({
        id,
        nome_fantasia,
        cnpj
    })

    if(!usuario || !empresa){
        throw new Error('Usuário não encontrado com o id infomado!');
    }

    await usuario.save();
    return await empresa.save();

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

    return await findedEmpresa.destroy();
    
}

module.exports = {
    create,
    findAll,
    findById,
    update,
    deleteById
}