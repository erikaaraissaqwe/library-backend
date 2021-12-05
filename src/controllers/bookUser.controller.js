
const { user } = require("../models");
const db = require("../models");
const BookUser = db.bookUser;
const Book = db.book;
const User = db.user;

const isNotEmpty = (value) => {
  return value && value.trim().length > 0;
}

exports.loan = (req, res) => {
  if (!(isNotEmpty(req.body.bookId) && 
        isNotEmpty(req.body.userId) &&
        isNotEmpty(req.body.loadDate) &&
        isNotEmpty(req.body.expectedDeliveryDate))) {
            
    res.status(400).send({id: 'missing-data', msg: "Dados para o empréstimo insuficientes." });
    return;
  }

    const bookUser = new BookUser({
      bookId: req.body.bookId,
      userId: req.body.userId,
      loadDate: req.body.loadDate,
      expectedDeliveryDate: req.body.expectedDeliveryDate,
      actualDeliveryDate: "",
    });



    bookUser.save(bookUser).then(data => {
      updateBook(req.body.bookId, true);
      res.send({ data });
    }).catch(err => {
        res.status(500).send({id: 'internal-error', msg: err.message });
    });
}

exports.listAll = (req, res) => {
   BookUser.find().then(async data => {
    for (const key in data) {
      let book = await Book.findOne(data[key].bookId);
      let user = await User.findOne(data[key].userId);
      data[key].bookId = book
      user.password=undefined;
      data[key].userId = user
    }
    res.send({ data });
  }).catch(err => {
    res.status(500).send({id: 'internal-error', msg: err.message });
  });
}

exports.listAllByUserId = (req, res) => {
  const id = req.params.id;
  BookUser.find({userId: id}).then(async data => {
   for (const key in data) {
     let book = await Book.findOne(data[key].bookId);
     data[key].bookId = book
   }
   res.send({ data });
 }).catch(err => {
   res.status(500).send({id: 'internal-error', msg: err.message });
 });
}

exports.listAllLateBooks = (req, res) => {
  BookUser.find().then(async data => {
    let dataFilter = []
    for (const key in data) {
      let diff = Date.now() - Date.parse(data[key].expectedDeliveryDate);
      let diffInDays = diff/(1000*3600*24);
      if (diffInDays >= 1) {
        let book = await Book.findOne(data[key].bookId);
        let user = await User.findOne(data[key].userId);
        data[key].bookId = book
        user.password=undefined;
        data[key].userId = user
        dataFilter[dataFilter.length] = data[key];
        
      }
    }
    res.send({"data" : dataFilter});
    
  }).catch(err => {
    res.status(500).send({id: 'internal-error', msg: err.message });
  });
}

exports.listLateBooksByUserId = (req, res) => {
  const id = req.params.id;
  BookUser.find({userId: id}).then(async data => {
    let dataFilter = [];
    for (const key in data) {
      let diff = Date.now() - Date.parse(data[key].expectedDeliveryDate);
      let diffInDays = diff/(1000*3600*24);
      if (diffInDays >= 1) {
        //populando livros
        let book = await Book.findOne(data[key].bookId);
        data[key].bookId = book
        dataFilter[dataFilter.length] = data[key];
      }
    }
    res.send({"data" : dataFilter});
    
  }).catch(err => {
    res.status(500).send({id: 'internal-error', msg: err.message });
  });
}

exports.delete = (req, res) => {
  const id = req.params.id;
  const id_book = req.params.id_book;

  if(!id){
    res.status(400).send({id: 'missing-data', msg: "Dados para a deleção insuficientes." });
    updateBook(id_book, true);
    return;
  }

  BookUser.findByIdAndRemove(id).then(data =>{
    if(!data){
      res.status(400).send({id: 'internal-error', msg: "Não foi possível remover o empréstimo." });
    }
    else{
      res.send({ data });
    }
  }).catch(err => {
    res.status(500).send({id: 'internal-error', msg: err.message });
  });
}

exports.listOne = (req, res) => {
  const id = req.params.id;
  BookUser.findById(id).then(async data => {
      if (!data) {
          res.status(404).send({id: 'book-not-found', msg: "Empréstimo inexistente." });
      } else {
          //populando livros e pessoas
          let book = await Book.findOne(data.bookId);
          let user = await User.findOne(data.userId);
          data.bookId = book
          user.password=undefined;
          data.userId = user
          res.send(data);
      }
  }).catch(err => {
      res.status(500).send({id: 'internal-error', msg: err.message });
  });
};

async function updateBook(id, borrowed){
  await Book.updateOne({_id:id},{$set: {'borrowed': borrowed}});
}