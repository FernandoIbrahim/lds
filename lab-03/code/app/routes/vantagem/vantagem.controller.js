const vantagemModel= require('../../models/vantagem/vantagem.model');

const { getUserIdFromToken } = require('../../services/jwt-decoder');

async function httpPost(req, res){

    try{
        const userId = getUserIdFromToken(req);

        const { nome, desc, foto, preco  } = req.body;

        const vantagem = await vantagemModel.create( userId, nome, desc, foto, preco );

        return res.status(201).json(vantagem);

    }catch(error){
        console.log(error);
        return res.status(500).json({error: 'error ao criar vantagem'});
    }

}


async function httpGetAll(req, res){
    try{

        const vantagens = await vantagemModel.findAll();

        return res.status(200).json(vantagens);

    }catch(error){
        console.log(error);
        return res.status(500).json({error: 'error ao encontrar vantagem'});
    }
}


async function httpGetById(req, res){
    try{

        const vantagemId = req.params.id;
        console.log(vantagemId);

        const vantagem = await vantagemModel.findById(vantagemId);

        return res.status(200).json(vantagem);

    }catch(error){
        console.log(error);
        return res.status(500).json({error: 'error ao encontrar vantagem'});
    }
}

module.exports = {
    httpGetAll,
    httpGetById,
    httpPost
}