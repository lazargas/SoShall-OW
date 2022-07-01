const express = require('express');
const {getPosts, createPost, postsByUser, postById, isPoster, deletePost, updatePost} = require('../controllers/post');
const validator = require('../Validator/index');
const {requireSignin} = require('../controllers/auth');
const {userById} = require('../controllers/user');

const router = express.Router();

router.get("/", getPosts);
router.post("/post/new/:userId", requireSignin, createPost, validator.createPostValidator);
router.get('/posts/by/:userId', requireSignin, postsByUser);
router.delete("/post/:postId", requireSignin, isPoster, deletePost);
router.put("/post/:postId", requireSignin, isPoster, updatePost);


router.param("userId", userById);
router.param("postId", postById);
module.exports = router; 

 