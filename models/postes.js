    const mongoose = require('mongoose');
const schemaposts = new mongoose.Schema({
    description:{
        type: String,
    },
    username:{
        type: 'string',
        // unique: true,
    },
    date:{
        type:Date,
    },
    commantaire:[{type:mongoose.Schema.Types.ObjectId,ref:"commantaire"}],
    nlikes:{
        type : Number,
        default: 0,
    },
    // nfavorites:{
    //     type : Number,
    //     default: 0,
    // }
})
const Schemaposts= mongoose.model("posts", schemaposts);
module.exports = Schemaposts;