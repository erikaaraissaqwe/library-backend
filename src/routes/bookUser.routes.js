module.exports = app => {
    const authMiddleware = require("../middlewares/Authentication");

    const bookUser = require("../controllers/bookUser.controller");
  
    var router = require("express").Router();
    
    router.post('/loan', authMiddleware.privateUser, bookUser.loan);

    router.get('/listAllLateBooks', authMiddleware.privateUser, bookUser.listAllLateBooks);

    router.get('/listLateBooksByUserId', authMiddleware.privateUser, bookUser.listLateBooksByUserId);

    router.get('/listAll', authMiddleware.privateUser, bookUser.listAll);

    router.get('/listAllByUserId/:id', authMiddleware.privateUser, bookUser.listAllByUserId);
   
    router.get('/listLateBooksByUserId/:id', authMiddleware.privateUser, bookUser.listLateBooksByUserId);

    router.get('/:id', authMiddleware.privateUser, bookUser.listOne);

    router.delete('/:id', authMiddleware.privateUser, bookUser.delete);

    app.use('/api/userBook', router);
};