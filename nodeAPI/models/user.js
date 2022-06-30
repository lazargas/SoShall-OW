const mongoose = require('mongoose');
let uuidv1 = require('uuidv1');
const crypto = require('node:crypto');

const userSchema = new mongoose.Schema({
    name: {
        type : String,
        trim : true,
        required: true
        
    },
    email: {
        type : String,
        trim : true,
        required: true
    },
    hashed_password: {
        type : String,
        required: true
    },
    salt : String,
    created: {
        type : Date,
        default : Date.now
    },
    updated : Date
    
});

//virtual fields

userSchema.virtual('password').set(function(password) {
    //temp var _password
    this._passwrod = password;
    //generate time stamp
    this.salt = uuidv1();

    this.hashed_password = this.encryptPassword(password);
})
.get(function(){
    return this._password;
});

userSchema.methods = {
    authenticate: function(plainText){
        return this.encryptPassword(plainText) === this.hashed_password; 
    },
    encryptPassword : function(password) {
        if(!password) return "";
        try{
            return crypto.createHmac('sha1', this.salt)
            .update(password)
            .digest('hex');
        } catch(err){
            return "";
        }

    }
};

module.exports = mongoose.model("User",userSchema);