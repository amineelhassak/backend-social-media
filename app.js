const mongoose = require('mongoose');
const express = require('express');
const port = 3000;
const ports = require('./src/posts');
const bodyParser = require('body-parser');
const users = require('./src/users');
const app = express();
const rundb = require('./db/rundb');
rundb;
const db = mongoose.connection;
db.on('error',()=>{
    console.error('Error!');
})
db.once("open",()=>{
    app.use(bodyParser.json());
    app.use("/",users);
    app.use("/",ports);
    console.log('Open successfully!');
    app.listen(port,()=>{
        console.log('listening on port 3000');
    }); 
});
