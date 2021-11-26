const jwt = require('jsonwebtoken');

const authConfig = require("../config/auth.config");

module.exports = {

    privateUser : async (req, res, next) => {
        if(!req.headers || req.headers.user_id === ""  || req.headers.authorization === ""){
            return res.status(401).send({id: 'invalid-header', msg:'Headers Vazio'});
        }
        authentication(req, res, next);
    },
}

function authentication(req, res, next){
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).send({id: 'invalid-token', msg:'Nenhum token foi fornecido'});
    }

    const parts = authHeader.split(' ');

    if(!parts.length === 2){
        return res.status(401).send({id: 'invalid-token', msg:'Token inválido'});
    }

    const [scheme, token] = parts;
    if(!/^Bearer$/i.test(scheme)){
        return res.status(401).send({id: 'invalid-token', msg:'Token mal formatado'});
    }
    
    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err){
            return res.status(401).send({id: 'invalid-token', msg:'Token inválido'});
        }
        req.userId = decoded.params.id;

        return next();
    });
}