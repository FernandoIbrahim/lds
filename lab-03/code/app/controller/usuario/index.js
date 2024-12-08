const userRepository = require('../../repository/usuario');
const { getUserIdFromToken } = require('../../services/jwt-decoder');

async function getOwnUserData(req, res) {
    try {

        const userId = getUserIdFromToken(req);

        if (!userId) {
            return res.status(401).json({ message: 'Usuário não autenticado.' });
        }

        const user = await userRepository.findOwnUser(userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
}

module.exports = { getOwnUserData };
