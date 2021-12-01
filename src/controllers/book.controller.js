
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
        isNotEmpty(req.body.image) &&
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
      image: req.body.image.trim(),
      resume: req.body.resume.trim()
    });

    book.save(book).then(data => {
      res.send({ data });
    }).catch(err => {
        res.status(500).send({id: 'internal-error', msg: err.message });
    });
}

exports.delete = (req, res) => {
  const id = req.params.id;

  if(!id){
    res.status(400).send({id: 'missing-data', msg: "Dados para a deleção insuficientes." });
    return;
  }

  Book.findByIdAndRemove(id).then(data =>{
    if(!data){
      res.status(400).send({id: 'internal-error', msg: "Não foi possível remover o livro" });
    }
    else{
      res.send({ data });
    }
  }).catch(err => {
    res.status(500).send({id: 'internal-error', msg: err.message });
  });
}

exports.update = (req, res) => {
  if (!(isNotEmpty(req.body.title) && 
  req.body.authors.length > 0 &&
  isNotEmpty(req.body.dateOfPublication) &&
  req.body.pages &&
  isNotEmpty(req.body.isbn) &&
  isNotEmpty(req.body.image) &&
  isNotEmpty(req.body.borrowed) &&
  isNotEmpty(req.body.resume))) {
      
    res.status(400).send({id: 'missing-data', msg: "Dados para a atualização insuficientes." });
    return;
  }

  const id = req.params.id;

  if(!id){
    res.status(400).send({id: 'missing-data', msg: "Dados para a atualização insuficientes." });
    return;
  }

  Book.findByIdAndUpdate(id, req.body).then(data =>{
    if(!data){
      res.status(400).send({id: 'book-not-found', msg: "Livro não cadastrado." });
    }
    else{
      console.log(data);
      res.send({ data });
    }
  }).catch(err => {
    res.status(500).send({id: 'internal-error', msg: err.message });
  });
}

exports.listAll = (req, res) => {
  Book.find().then(data => {
    res.send({ data });
  }).catch(err => {
    res.status(500).send({id: 'internal-error', msg: err.message });
  });
}

exports.listOne = (req, res) => {
  const id = req.params.id;

  Book.findById(id).then(data => {
      if (!data) {
          res.status(404).send({id: 'book-not-found', msg: "Livro não cadastrado." });
      } else {
          res.send(data);
      }
  }).catch(err => {
      res.status(500).send({id: 'internal-error', msg: err.message });
  });
};