module.exports = app => {
    const authMiddleware = require("../middlewares/Authentication");

    const bookUser = require("../controllers/bookUser.controller");
  
    var router = require("express").Router();
    
    router.post('/loan', authMiddleware.privateUser, bookUser.loan);

    router.get('/listAllLateBooks', bookUser.listAllLateBooks);

    router.get('/listLateBooksByUserId', authMiddleware.privateUser, bookUser.listLateBooksByUserId);

    router.get('/listAll', bookUser.listAll);

    router.get('/:id', authMiddleware.privateUser, bookUser.listOne);

    app.use('/api/userBook', router);
};