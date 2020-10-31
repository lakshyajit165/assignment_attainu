
module.exports = app => {

    
    const { authJwt } = require("../middlewares");
    const addressupdate = require("../controllers/addressupdate.controller");
  
    const router = require("express").Router();

    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      
      next();
    });

    app.use("/api/v1", router);
  
   
    // Update a user(or his/her address) with id
    router.put("/user/:id", [authJwt.verifyToken, authJwt.isUser], addressupdate.update);
  
   
  
  };
  