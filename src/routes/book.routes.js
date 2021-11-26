
module.exports = app => {
    const authMiddleware = require("../middlewares/Authentication");

    const book = require("../controllers/book.controller");
  
    var router = require("express").Router();
    
    router.post('/register', authMiddleware.privateUser, book.register);
    
    app.use('/api/book', router);
};