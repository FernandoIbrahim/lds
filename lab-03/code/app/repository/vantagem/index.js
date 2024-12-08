const Empresa = require('../../models/empresa');
const Vantagem = require('../../models/vantagem');
const { Error } = require('sequelize');


async function create(userId, nome, desc, foto, preco ) {


    if(!userId){
        throw new Error('Usuário não autenticado');
    }

    const vantagem = await Vantagem.create({
        userId,
        nome,
        desc,
        foto,
        preco,
        empresa_id: userId
    })

    return vantagem;

};


async function update(id, nome, desc, foto, preco) {

    const vantagem = await Vantagem.findByPk(id);

    if (!vantagem) {
        throw new Error('Vantagem não encontrado com o id informado!');
    }


    const vantagemBody = {
        nome,
        desc,
        foto,
        preco
    };


    await vantagem.update(vantagemBody);

    return vantagem; 
}


async function findAll(){

    const vantagens = await Vantagem.findAll({
        include: Empresa
    })

    return vantagens;

};


async function findById(id){

    const vantagem = await Vantagem.findByPk(id, {
        include: Empresa
    });

    return vantagem;
};


async function deleteById(id){

    const findedVantagem = await Vantagem.findByPk(id);

    return await findedVantagem.destroy();

}

module.exports = {
    create,
    findAll,
    findById,
    update,
    deleteById
}