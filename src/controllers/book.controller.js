
const db = require("../models");
const Book = db.book;

const isNotEmpty = (value) => {
  return value && value.trim().length > 0;
}

exports.register = (req, res) => {
  if (!(isNotEmpty(req.body.title) && 
        req.body.authors.length > 0 &&
        isNotEmpty(req.body.dateOfPublication) &&
        req.body.pages &&
        isNotEmpty(req.body.isbn) &&
        isNotEmpty(req.body.resume))) {
            
    res.status(400).send({id: 'missing-data', msg: "Dados para cadastro insuficientes." });
    return;
  }

    const book = new Book({
      title: req.body.title.trim(),
      authors: req.body.authors,
      dateOfPublication: req.body.dateOfPublication,
      pages: parseInt(req.body.pages),
      isbn: req.body.isbn,
      resume: req.body.resume.trim()
    });

    book.save(book).then(data => {
      res.send({ data })
    }).catch(err => {
        res.status(500).send({id: 'internal-error', msg: err.message });
    });
}


