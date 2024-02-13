const mongoose = require('mongoose');
const x = mongoose.connect("mongodb://localhost:27017/db");
module.exports = x;