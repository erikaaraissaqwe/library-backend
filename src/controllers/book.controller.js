
const db = require("../models");
const Book = db.book;
const BookUser = db.bookUser;

const isNotEmpty = (value) => {
  return value && value.trim().length > 0;
}

exports.register = (req, res) => {
  if (!(isNotEmpty(req.body.title) && 
        isNotEmpty(req.body.author) &&
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
      author: req.body.author,
      dateOfPublication: req.body.dateOfPublication,
      pages: parseInt(req.body.pages),
      isbn: req.body.isbn,
      image: req.body.image.trim(),
      resume: req.body.resume.trim(),
      borrowed: req.body.borrowed === "true" ? true : false
    });

    book.save(book).then(data => {
      res.send({ data });
    }).catch(err => {
        res.status(500).send({id: 'internal-error', msg: err.message });
    });
}

exports.delete = async (req, res) => {
  const id = req.params.id;

  if(!id){
    res.status(400).send({id: 'missing-data', msg: "Dados para a deleção insuficientes." });
    return;
  }

  let bookUser = await BookUser.findOne({bookId: id});
  console.log(bookUser);

  if(bookUser){
    res.status(400).send({id: 'book-using', msg: "Este livro não pode ser removido pois ele está emprestado." });
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
  isNotEmpty(req.body.author) &&
  isNotEmpty(req.body.dateOfPublication) &&
  req.body.pages &&
  isNotEmpty(req.body.isbn) &&
  isNotEmpty(req.body.image) &&
  isNotEmpty(req.body.resume))) {
      
    res.status(400).send({id: 'missing-data', msg: "Dados para a atualização insuficientes." });
    return;
  }

  const id = req.params.id;

  if(!id){
    res.status(400).send({id: 'missing-data', msg: "Dados para a atualização insuficientes." });
    return;
  }

  req.body.borrowed = req.body.borrowed === "true" ? true : false;
  Book.findByIdAndUpdate(id, req.body).then(data =>{
    if(!data){
      res.status(400).send({id: 'book-not-found', msg: "Livro não cadastrado." });
    }
    else{
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

exports.listAllBorrowed = (req, res) => {

  Book.find({borrowed: true}).then(data => {
    res.send({ data });
  }).catch(err => {
    res.status(500).send({id: 'internal-error', msg: err.message });
  });
}

exports.listAllWithId = (req, res) => {
  Book.find({_id: true}).then(data => {
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