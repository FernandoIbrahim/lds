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

async function update(id, nome, email,senha ,endereco, curso, instituicao_id){

    const usuario = await Usuario.findByPk(id);
    const aluno = await Aluno.findByPk(id);

    usuario.set({
        email,
        senha
    })

    aluno.set({
        nome,
        endereco,
        curso,
        instituicao_id
    })

    if(!usuario || !aluno){
        throw new Error('Usuário não encontrado com o id infomado!');
    }

    await usuario.save();
    return await aluno.save();

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
    const findedUser = await Usuario.findByPk(id);

    return await findedUser.destroy();
    
}

module.exports = {
    create,
    findAll,
    findById,
    update,
    deleteById
}