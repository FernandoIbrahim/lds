const empresaModel= require('../../repository/usuario/empresa');

async function httpPost(req, res){

    try{
    
        const { nome_fantasia, email, senha, cnpj  } = req.body;

        const empresa = await empresaModel.create(nome_fantasia, email, senha, cnpj);

        return res.status(201).json(empresa);

    }catch(error){
        console.log(error);
        return res.status(500).json({error: 'error ao criar usuário'});
    }

}

async function httpGetAll(req, res){

    try{

        const empresas = await empresaModel.findAll();

        console.log(empresas);
        return res.status(200).json(empresas);

    }catch(error){
        console.log(error);
        return res.status(500).json({error: 'error ao encontrar o usuário'});
    }

}


async function httpGetById(req, res){

    try{
        
        const id = req.params.id;

        const empresa = await empresaModel.findById(id);

        return res.status(200).json(empresa);

    }catch(error){
        return res.status(500).json({error: 'error ao encontrar o usuário'});
    }

}



async function httpPut(req, res){

    try{
    
        const { nome_fantasia, email, senha, cnpj  } = req.body;
        const id = req.params.id;

        const updatedEmpresa = await empresaModel.update( id, nome_fantasia, email, senha, cnpj  );

        return res.status(200).json(updatedEmpresa);

    }catch(error){
        return res.status(500).json({error: 'error ao encontrar usuário'});
    }

}



async function httpDelete(req, res){

    try{
    
        const id = req.params.id;

        const deletedEmpresa =  await empresaModel.deleteById(id);

        return res.status(204).json(deletedEmpresa);

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