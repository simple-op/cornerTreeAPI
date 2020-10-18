const express=require("express");
// requiring express router as middle ware 
const router=express.Router();
// requiring home controllers


const mongo=require("../config/mongoose")


// default home route

const users= require("./users");
const jobs = require("./jobs");


router.use("/users", users); 
router.use("/jobs", jobs);


// exports router for  main index.js
module.exports=router;