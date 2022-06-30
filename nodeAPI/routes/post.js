const express = require('express');
const {getPosts, createPost} = require('../controllers/post');
const validator = require('../Validator/index');
const {requireSignin} = require('../controllers/auth');
const {userById} = require('../controllers/user');

const router = express.Router();

router.get("/", getPosts);
router.post("/post", requireSignin, validator.createPostValidator, createPost);

router.param("userId", userById);
module.exports = router; 

 