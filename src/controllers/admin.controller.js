const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.config');
const emailChecker = require("email-validator");

const db = require("../models");
const Admin = db.admin;

const isNotEmpty = (value) => {
  return value && value.trim().length > 0;
}

function generateToken(params = {}) {
  return jwt.sign({ params }, authConfig.secret, {
    expiresIn: 10286,
  });
}

exports.login = (req, res) => {
  if (!(isNotEmpty(req.body.email) && isNotEmpty(req.body.password))) {
    res.status(400).send({id: 'missing-data', msg: "Dados para login insuficientes." });
    return;
  }

  if (!emailChecker.validate(req.body.email)) {
    res.status(400).send({id: 'invalid-email', msg: "O e-mail é inválido." });
    return;
  }

  Admin.findOne({ email: req.body.email }).then(data => {
    if (!data) {
      res.status(404).send({id: 'admin-not-found', msg: "Administrador não encontrado" });
      return;
    }

    bcrypt.compare(req.body.password, data.password).then(match => {
      if (!match) {
        res.status(400).send({id: 'invalid-password', msg: "Senha inválida." });
        return;
      }

      data.password = undefined;
      res.send({ data, token: generateToken({ id: data.id }), expiresIn: authConfig.expiresIn + new Date().getTime() })
    });
  }).catch(err => {
    res.status(500).send({id: 'internal-error', msg: err.message });
  });
}
