const transacaoRepository = require('../../models/transacao/transacao.repository');

const { getUserIdFromToken } = require('../../services/jwt-decoder');

async function httpPost(req, res){

    try{
        const userId = getUserIdFromToken(req);


        if (!userId) {
            return res.status(401).json({ message: 'Usuário não autenticado.' });
        }

        const { tipo, receptorUserId, valor, vantagemId, desc} = req.body;

        if (!tipo) {
            return res.status(400).json({ error: 'Dados insuficientes para criar a transação' });
        }


        const transacao = await transacaoRepository.create(tipo, userId ,receptorUserId, valor, vantagemId, desc);

        return res.status(201).json(transacao);

    }catch(error){
        console.log(error);
        return res.status(500).json({error: 'error ao criar transacao'});
    }

}



async function httpGetAll(req, res){

    try{
        const userId = getUserIdFromToken(req);

        const { tipo } = req.query;

        const transacoes = await transacaoRepository.findAll(userId, tipo);

        return res.status(200).json(transacoes);

    }catch(error){
        console.log(error);
        return res.status(500).json({error: 'error ao encontrar transacoes'});
    }

}


module.exports = {
    httpPost,
    httpGetAll
}