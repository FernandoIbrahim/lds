const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../../models/usuario/usuario.sequelize');

const JWT_SECRET = 'sheesh';

async function httpLogin(req, res){
    const { email, senha } = req.body;

    try{

        const usuario = await Usuario.findOne({where:{email}});

        if( !usuario ){
            return res.status(401).json({error:'Usuario não encontrado'});
        }
        
        const isMatch = await bcrypt.compare(senha, usuario.senha);

        if (!isMatch) {
            return res.status(401).json({ error: 'Senha incorreta' });
        }

        const token = jwt.sign({ id: usuario.id, email: usuario.email }, JWT_SECRET, { expiresIn: '1h' });

        return res.json({ token });

    }catch (error) {

        console.error(error);
        return res.status(500).json({ error: 'Erro ao fazer login' });

    }
}


module.exports = {
    httpLogin
}