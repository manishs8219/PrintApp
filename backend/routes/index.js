var express = require('express');
var router = express.Router();


const userController = require('../adminController/userController')
const dashbordController = require("../adminController/dashboardController")

const accountController = require("../adminController/accountController")

const cmsController = require("../adminController/cmsController")

const authenticateJWT = require('../helper/helper').authenticateJWT
const verifyUser = require('../helper/helper').verifyUser

router.post("/signup",userController.signup)

router.post("/login",userController.login)

router.get("/getprofile",authenticateJWT,verifyUser,userController.getprofile)

router.put("/editProfile",authenticateJWT,verifyUser,userController.editProfile)

router.get("/dashboardofadmin",authenticateJWT,verifyUser,dashbordController.dashboardofadmin)

router.post("/addaccount",authenticateJWT,verifyUser,accountController.Addaccount)

router.get("/accountList",authenticateJWT,verifyUser,accountController.accountList)

router.delete("/delete_user/:_id",authenticateJWT,verifyUser,accountController.delete_user)

router.get("/accountdataget/:_id",accountController.accountdataget)

router.post("/search",authenticateJWT,verifyUser,accountController.search)


router.get("/cmsGetAll",authenticateJWT,verifyUser,cmsController.cmsGetAll)

router.post("/termsAndConditionsCreate",authenticateJWT,verifyUser,cmsController.termsAndConditionsCreate)

router.get("/termsAndConditionsGet",authenticateJWT,verifyUser,cmsController.termsAndConditionsGet)


router.put("/termsAndConditionsUpdate",authenticateJWT,verifyUser,cmsController.termsAndConditionsUpdate)

router.get("/privacyPolicyGet",authenticateJWT,verifyUser,cmsController.privacyPolicyGet)

router.put("/privacyPolicyUpdate",authenticateJWT,verifyUser,cmsController.privacyPolicyUpdate)

router.put("/update/:_id",authenticateJWT,verifyUser,accountController.update)

router.put("/userlogout",authenticateJWT,verifyUser,userController.userLogout)

module.exports = router;
