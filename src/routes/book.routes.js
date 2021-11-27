
module.exports = app => {
    const authMiddleware = require("../middlewares/Authentication");

    const book = require("../controllers/book.controller");
  
    var router = require("express").Router();
    
    router.post('/register', authMiddleware.privateUser, book.register);

    router.put('/:id', authMiddleware.privateUser, book.update);

    router.get('/listAll', authMiddleware.privateUser, book.listAll);

    router.get('/:id', authMiddleware.privateUser, book.listOne);

    router.delete('/:id', authMiddleware.privateUser, book.delete);
    
    app.use('/api/book', router);
};