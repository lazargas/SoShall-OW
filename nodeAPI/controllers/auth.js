const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user');

exports.signup = async (req,res)=>{
    const userExists = await User.findOne({email : req.body.email});
    if(userExists) return res.status(403).json({
        error : "Email is taken"
    });
    const user = await new User(req.body);
    await user.save();
    res.status(200).json({
         message: "Sign Up success! Please login"
    });
};

exports.signin = (req,res)=>{
    //find user 
    const {email, password} = req.body;
    User.findOne({email}, (err,user)=>{
        //error
        if(err || !user){
        return res.status(401).json({
            error: "User with that email does not exist. Please sign in."
        });
    }
    //password match chekc
    if(!user.authenticate(password)){
        return res.status(401).json({
            error: "Email and password does not match"
        });

    }
    //generate token
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
   //persist
    res.cookie('t', token,{expire: new Date()+9999});
    //return json as user and email and token to frontend
    const {_id, name,email,role}=user;
    return res.json({
      token,user: {_id, name,email,role}
    });
    });  
};

exports.signout = (req,res)=>{
    res.clearCookie('t');
    return res.json({
        message: "Sign Out Succesful"
    });
};