const professorModel = require('../../repository/usuario/professor');

async function httpPost(req, res) {
    try {
        const { nome, cpf, materia, instituicao_id, email, senha } = req.body;

        const professor = await professorModel.create(nome, cpf, materia, instituicao_id, email, senha);

        return res.status(201).json(professor);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Erro ao criar professor' });
    }
}

async function httpGetAll(req, res) {
    try {
        const professores = await professorModel.findAll();

        return res.status(200).json(professores);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Erro ao encontrar professores' });
    }
}

async function httpGetById(req, res) {
    try {
        const id = req.params.id;

        const professor = await professorModel.findById(id);

        if (!professor) {
            return res.status(404).json({ error: 'Professor não encontrado' });
        }

        return res.status(200).json(professor);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Erro ao encontrar professor' });
    }
}

async function httpPut(req, res) {
    try {
        const { nome, cpf, materia, instituicao_id, email, senha } = req.body;
        const id = req.params.id;

        const updatedProfessor = await professorModel.update(id, nome, cpf, materia, instituicao_id, email, senha);

        return res.status(200).json(updatedProfessor);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Erro ao atualizar professor' });
    }
}

async function httpDelete(req, res) {
    try {
        const id = req.params.id;

        const deletedProfessor = await professorModel.deleteById(id);

        return res.status(204).json(deletedProfessor);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Erro ao deletar professor' });
    }
}

module.exports = {
    httpPost,
    httpGetAll,
    httpGetById,
    httpPut,
    httpDelete
};
