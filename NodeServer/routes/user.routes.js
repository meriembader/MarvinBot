module.exports = app => {
    constuser = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // Create a new user
    router.post("/",user.create);
  
    // Retrieve alluser
    router.get("/",user.findAll);
  
    // Retrieve all testeduser
    //router.get("/tested",user.findAlltested);
  
    // Retrieve a single user with id
    router.get("/:id",user.findOne);
  
    // Update a user with id
    router.put("/:id",user.update);
  
    // Delete a user with id
    router.delete("/:id",user.delete);
  
    // Create a new user
    router.delete("/",user.deleteAll);
  
    app.use('/api/user', router);
  };