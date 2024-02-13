const express = require('express');
const Router = express.Router();
const users = require('../models/users');
Router.route("/users").get(async (req,res)=>{
    try{
        const urs = await users.find();
        if (urs.length > 0){
            console.log("Success! find Users");
            res.status(200).json({message:'Success! find Users',urs});
        }else{
            console.log('Error ! not find Users');
            res.status(404).json({message:'Error ! not find Users for delete'})};
    }catch(error){
        console.error('Internal Server Error',error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}).post(async (req,res)=>{
    try {
        const user = await users.create({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            tele:req.body.tele,
            password:req.body.password,
            confirme_password:req.body.confirme_password,
            username:req.body.username,
            date : Date.now()
        })
        user.save()
        .then(()=>{
            console.log("save success!");
            res.status(200).json({message: "success add user !!",user});
        }).catch((error)=>{
            console.log("Error save user",error);
            res.status(403).send("Error save use",error);
        });
    }catch(error){
        console.error('Internal Server Error:', error);
        res.status(400).json({ error: 'Internal Server Error' });
    };
}).delete((req, res)=>
{
    try{
        users.deleteMany().then(()=>{
            console.log("Success! All users deleted.");
            res.status(200).send("Success! All users deleted.");
        }).catch((error)=>{
            console.log("Error! deleting");
            res.status(404).send("Error deleting");
        })
    }catch(error){
        console.error('Internal Server Error',error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

Router.route("/users/:username").delete(async (req,res)=>{
    try{
        const user = await users.findOneAndDelete({
            username:req.params.username});
        if (user){
            console.log("Success! user deleted .",user);
            res.status(200).json({message : "Success! user deleted ." ,user});
        }else{
            console.log("User not find for delete");
            res.status(404).send("User not find for delete");
        }
    }catch(error){
        console.error('Internal Server Error', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }    
}).get(async (req,res)=>{
    try{
        const user = await users.findOne({username:req.params.username});
        if (user){ 
            console.log("find success!",user);
            res.status(200).json({ message: 'find succes!',user});
        }else{
            console.log("not find!");
            res.status(404).json({ Error:"not find!"});
        }
    }catch(error){
        console.error("Internal Server Error : ",error)
        res.status(500).json({ Error:"Internal Server Error"});
    }
}).put(async (req, res) => {
    try {
      const updatedUser = await users.findOneAndReplace(
        { username: req.params.username },
        {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          tele: req.body.tele,
          password: req.body.password,
          confirmPassword: req.body.confirmPassword,
          email: req.body.email,
          username: req.body.username,
          date : Date.now()
        },
        { new: true }
      );
      if (updatedUser) {
        console.log('Update success!');
        res.status(200).send({ message: 'User updated successfully', updatedUser });
      } else {
        res.status(404).json({ error: 'User not find!' });
      }
    } catch(error){
      console.error('Internal Server Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});
module.exports = Router;