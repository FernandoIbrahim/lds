const Usuario = require('./usuario.sequelize');

async function findOwnUser(userId){

    const usuario = await Usuario.findByPk(userId);
    if(!usuario){
        throw new Error('Não foi possível altenticar o usuário');
    }

    return usuario;

}

module.exports = {
    findOwnUser
}