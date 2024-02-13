const mongoose = require('mongoose');
const schemacommantaire = new mongoose.Schema (
{
    id:
    {
        type : Number,
        required : true,
        unique : true
    },
    date:{
        type:Date,
        required:true,
        default:new Date
    },
    commantaire: String,
})
const Schemacommantaire = mongoose.model("commantaire",schemacommantaire);
module.exports = Schemacommantaire;