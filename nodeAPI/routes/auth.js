const express = require('express');
const {signup,signin,signout} = require('../controllers/auth');
const {userById} = require('../controllers/user');
const {userSignupValidator} = require('../Validator')
//const validator = require('../Validator/index');

const router = express.Router();


router.post("/signup",userSignupValidator,signup);
router.post("/signin", signin);
router.get("/signout",signout);

router.param("userId", userById);


module.exports = router; 

