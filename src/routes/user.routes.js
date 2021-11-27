module.exports = app => {
    const authMiddleware = require("../middlewares/Authentication");

    const user = require("../controllers/user.controller");
  
    var router = require("express").Router();
  
    router.post('/signup', user.signUp);
  
    router.post('/login', user.login);

    router.put('/:id', authMiddleware.privateUser, user.update);

    router.get('/listAll', authMiddleware.privateUser, user.listAll);

    router.get('/:id', authMiddleware.privateUser, user.listOne);

    router.delete('/:id', authMiddleware.privateUser, user.delete);
    
    app.use('/api/user', router);
};