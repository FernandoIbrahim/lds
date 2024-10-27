const alunoModel = require('../../models/usuario/aluno/aluno.model');

async function httpPost(req, res){

    try{
    
        const { nome, email, senha, endereco, curso, instituicao_id } = req.body;

        const aluno = await alunoModel.create(nome, email, senha, endereco, curso, instituicao_id );

        return res.status(201).json(aluno);

    }catch(error){
        console.log(error);
        return res.status(500).json({error: 'error ao criar usuário'});
    }

}

async function httpGetAll(req, res){

    try{

        const alunos = await alunoModel.findAll();

        return res.status(200).json(alunos);

    }catch(error){
        console.log(error);
        return res.status(500).json({error: 'error ao encontrar o usuário'});
    }

}


async function httpGetById(req, res){

    try{
        
        const id = req.params.id;

        const aluno = await alunoModel.findById(id);

        return res.status(200).json(aluno);

    }catch(error){
        return res.status(500).json({error: 'error ao encontrar o usuário'});
    }

}



async function httpPut(req, res){

    try{
    
        const { nome, email, senha, endereco, curso, instituicao_id } = req.body;
        const id = req.params.id;

        const aluno = await alunoModel.update(id, nome, email, senha, endereco, curso, instituicao_id );

        return res.status(200).json(aluno);

    }catch(error){
        return res.status(500).json({error: 'error ao encontrar usuário'});
    }

}



async function httpDelete(req, res){

    try{
    
        const id = req.params.id;

        const deletedAluno =  await alunoModel.deleteById(id);

        return res.status(204).json(deletedAluno);

    }catch(error){
        return res.status(500).json({error: 'error ao deletar usuário'});
    }

}

module.exports = {
    httpPost,
    httpGetAll,
    httpGetById,
    httpPut,
    httpDelete
}