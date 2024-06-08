const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String
    },
    username:{
        type: String
    },
    email:{
        type: String
    },
    password:{
        type : String
    },
    role:{
        type: String
    },
    age:{
        type: Number
    }
})

const User = mongoose.model('User',userSchema);
module.exports = User;