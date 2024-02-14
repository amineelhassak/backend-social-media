const mongoose = require('mongoose');
const schemaUsers = new mongoose.Schema({
    username:{
        type: 'string',
        // unique: true
    },
    firstname:{
        type:String,
        // required:true 
    },
    lastname :{
        type:String,
        // required:true
    },
    date:Date,
    email:{
        type: String,
        // required:true,
    },
    tele:{
        // required:true,
        type:Number,
    },
    password:{
        type:String,
        // required:true,
        // max : 100,
        // min : 10
    },
    confirme_password:{
        type:String,
        // required:true,
        // max : 100,
        // min : 10
    },
    posts :  [{type : mongoose.Schema.Types.ObjectId, ref: 'posts' }]
})
const Schemausers=mongoose.model('users', schemaUsers);
module.exports = Schemausers;