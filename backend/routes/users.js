var express = require('express');
var router = express.Router();




const userController = require("../apiController/userController")

const authenticateJWT = require('../helper/helper').authenticateJWT
const verifyUser = require('../helper/helper').verifyUser


router.post("/loginUser",authenticateJWT,verifyUser,userController.loginUser)


module.exports = router;
