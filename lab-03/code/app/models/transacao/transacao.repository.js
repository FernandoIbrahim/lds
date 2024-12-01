const Usuario = require('../usuario/usuario.sequelize');
const Transacao = require('./transacao.sequelize');
const Cupom = require('../cupom/cupom.sequelize');
const Vantagem = require('../vantagem/vantagem.sequelize');
const { v4: uuidv4 } = require('uuid'); 
const { Error, where } = require('sequelize');
const { Op } = require('sequelize'); 


async function create(tipo, loggedUserId, receptorUserId , valor, vantagemId, desc) {

    const loggedUser = await Usuario.findByPk(loggedUserId);

    if(!loggedUser){
        throw new Error('Usuário logado não encontrado');
    }

    var transacao;

    if(tipo == "doacao" ){
        transacao = await donation(loggedUser, valor, desc ,receptorUserId);
    }

    if(tipo == "compra" ){
        transacao = await purchase(loggedUser ,vantagemId);
    }

    return transacao;
};


async function purchase(comprador, vantagemId) {

    const vantagem = await Vantagem.findByPk(vantagemId);

      

    if (!vantagem) {
        throw new Error('Vantagem não encontrada');
    }

    const cupom = await cupomCreate(vantagemId);

      
    if (cupom) {
      console.log('Cupom encontrado:', cupom.toJSON());
    } else {
      console.log('Nenhum cupom encontrado com o nome fornecido.');
    }

    if(comprador.pontos < vantagem.preco){
        throw new Error('Usuário é incapaz de completar a transão');
    }

    const receptorUser = await Usuario.findByPk(vantagem.empresa_id);

    if (!receptorUser) {
        throw new Error('Receptor não encontrado');
    }

    comprador.pontos -= vantagem.preco;
    receptorUser.pontos += vantagem.preco;

    await comprador.save();
    await receptorUser.save();

    const transacao = await Transacao.create({
        tipo: "compra",
        usuario1: comprador.id,
        usuario2: receptorUser.id,
        valor: vantagem.preco,
        vantagem_id: vantagem.id,
        data: new Date(),
        cupom_id: cupom.id
    });

    return transacao;
}



async function donation(doador, valor, desc ,receptorUserId){
    const receptorUser = await Usuario.findByPk(receptorUserId);

    if (!receptorUser) {
        throw new Error('Receptor não encontrado');
    }

    if (doador.pontos < valor) {
        throw new Error('Usuário é incapaz de completar a transação');
    }    

    doador.pontos -= valor;
    receptorUser.pontos += valor;

    await doador.save();
    await receptorUser.save();

    const transacao = await Transacao.create({
        tipo: "doacao",
        usuario1: doador.id,
        usuario2: receptorUser.id,
        desc: desc,
        valor: valor,
        data: new Date(),
    });

    return transacao;

}
async function findAll(idUsuario, tipo) {

    console.log(tipo);
    
    const condition = {
        [Op.or]: [
            { usuario1: idUsuario },
            { usuario2: idUsuario }
        ]
    };

    if (tipo) {
        condition.tipo = tipo;
    }

    return Transacao.findAll({
        where: condition
    });
}


module.exports = {
    create,
    findAll
}




async function cupomCreate(vantagemId) {
  try {
    // Obtém a vantagem pelo ID
    const vantagem = await Vantagem.findByPk(vantagemId);

    if (!vantagem) {
      throw new Error(`Vantagem com ID ${vantagemId} não encontrada`);
    }

    // Gera um código único e define um nome baseado na vantagem
    const codigo = uuidv4().slice(0, 8); // Pega os 8 primeiros caracteres do UUID
    const nome = `Cupom-${vantagem.nome.replace(/\s+/g, '-')}`; // Substitui espaços no nome da vantagem por '-'

    // Cria o cupom
    const cupom = await Cupom.create({
      nome,
      codigo,
      vantagem_id: vantagem.id, // Relaciona com a vantagem
    });

    console.log('Cupom criado com sucesso:', cupom.toJSON());
    return cupom;
  } catch (error) {
    console.error('Erro ao criar o cupom:', error.message);
  }
}

// Exemplo de uso
(async () => {
  const vantagemId = 1; // Substitua pelo ID real da vantagem
  await cupomCreate(vantagemId);
})();
