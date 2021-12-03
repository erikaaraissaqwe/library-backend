
const db = require("../models");
const BookUser = db.BookUser;

const isNotEmpty = (value) => {
  return value && value.trim().length > 0;
}

exports.register = (req, res) => {
  if (!(isNotEmpty(req.body.bookId) && 
        isNotEmpty(req.body.userId) &&
        isNotEmpty(req.body.loadDate) &&
        isNotEmpty(req.body.expectedDeliveryDate) &&
        isNotEmpty(req.body.actualDeliveryDate) &&
        isNotEmpty(req.body.timestamps))) {
            
    res.status(400).send({id: 'missing-data', msg: "Dados para cadastro insuficientes." });
    return;
  }

    const BookUser = new BookUser({
      bookId: req.body.bookId,
      userId: req.body.userId,
      loadDate: req.body.loadDate,
      expectedDeliveryDate: req.body.expectedDeliveryDate,
      actualDeliveryDate: req.body.actualDeliveryDate,
      timestamps: req.body.timestamps,
    });

    BookUser.save(BookUser).then(data => {
      res.send({ data });
    }).catch(err => {
        res.status(500).send({id: 'internal-error', msg: err.message });
    });
}

exports.listAll = (req, res) => {
  BookUser.find().then(data => {
    res.send({ data });
  }).catch(err => {
    res.status(500).send({id: 'internal-error', msg: err.message });
  });
}

exports.listOne = (req, res) => {
  const id = req.params.id;

  BookUser.findById(id).then(data => {
      if (!data) {
          res.status(404).send({id: 'book-not-found', msg: "Livro não cadastrado." });
      } else {
          res.send(data);
      }
  }).catch(err => {
      res.status(500).send({id: 'internal-error', msg: err.message });
  });
};