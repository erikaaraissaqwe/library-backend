module.exports = app => {
    const user = require("../controllers/user.controller");
  
    var router = require("express").Router();
  
    router.post('/signup', user.signUp);
  
    router.post('/login', user.login);
    
    app.use('/api/user', router);
};