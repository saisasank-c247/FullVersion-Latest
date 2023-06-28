const loginUserController = require("../../controllers/login/Login")

const router = require('express').Router()

router.get('/login' , loginUserController.LoginUser)

module.exports = router 
