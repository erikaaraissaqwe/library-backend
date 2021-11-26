const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.config');
const emailChecker = require("email-validator");

const db = require("../models");
const User = db.user;

const isNotEmpty = (value) => {
  return value && value.trim().length > 0;
}

function generateToken(params = {}) {
  return jwt.sign({ params }, authConfig.secret, {
    expiresIn: 10286,
  });
}

exports.signUp = (req, res) => {
  if (!(isNotEmpty(req.body.name) && isNotEmpty(req.body.email) && isNotEmpty(req.body.password) && isNotEmpty(req.body.phone))) {
    res.status(400).send({id: 'missing-data', msg: "Dados para cadastro insuficientes." });
    return;
  }
  if (!emailChecker.validate(req.body.email)) {
    res.status(400).send({id: 'invalid-email', msg: "O e-mail é inválido." });
    return;
  }

  User.findOne({ email: req.body.email }).then(data => {
    if (data) {
      res.status(400).send({id: 'email-already-in-use', msg: "Este e-mail já está sendo usado." });
      return;
    }

    const user = new User({
      name: req.body.name.trim(),
      email: req.body.email.trim(),
      phone: req.body.phone.trim(),
      password: req.body.password.trim()
    });

    user.save(user).then(data => {
      data.password = undefined;
      res.send({ data, token: generateToken({ id: data.id }) })
    });

  }).catch(err => {
    res.status(500).send({id: 'internal-error', msg: err.message });
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

  User.findOne({ email: req.body.email }).then(data => {
    if (!data) {
      res.status(404).send({id: 'user-not-found', msg: "Usuário não encontrado" });
      return;
    }

    bcrypt.compare(req.body.password, data.password).then(match => {
      if (!match) {
        res.status(400).send({id: 'invalid-password', msg: "Senha inválida." });
        return;
      }

      data.password = undefined;
      res.send({ data, token: generateToken({ id: data.id }) })
    });
  }).catch(err => {
    res.status(500).send({id: 'internal-error', msg: err.message });
  });
}