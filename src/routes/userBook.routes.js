module.exports = app => {
    const authMiddleware = require("../middlewares/Authentication");

    const bookUser = require("../controllers/bookUser.controller");
  
    var router = require("express").Router();
    
    router.post('/emprestimo', authMiddleware.privateUser, bookUser.register);

    router.get('/bookBorrowed', authMiddleware.privateUser, bookUser.listAll);

    router.get('/:id', authMiddleware.privateUser, bookUser.listOne);
    
    router.delete('/:id', authMiddleware.privateUser, bookUser.delete);
    
    app.use('/api/book', router);
};