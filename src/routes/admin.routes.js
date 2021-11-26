module.exports = app => {
    const admin = require("../controllers/admin.controller");
  
    var router = require("express").Router();
    
    router.post('/login', admin.login);

    app.use('/api/admin', router);
};