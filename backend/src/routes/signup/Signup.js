const userSignUpController = require('../../controllers/signup/Signup')

const router = require('express').Router()

router.post('/signup' , userSignUpController.addUser)


module.exports = router 
