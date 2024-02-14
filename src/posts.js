const express = require('express');    const Router = express.Router();
    const posts = require('../models/postes');
    const users = require('../models/users');
const { json } = require('body-parser');
    Router.route('/users/:username/posts')
    .post(async (req, res) => {
        try{
            const user = await users.findOne({username: req.params.username});
            if(!user) {
                console.error("User not found");
                res.status(404).send({message: "User not found"});
                return;
            }
            if (user){
                const post = await posts.create({
                    username: req.params.username,
                })
                console.log("User created!");
                await post.save();
                console.log("Use saved!");
                    console.log("User found!");
                    user.posts.push(post._id);
                    await user.save();
                    console.log("Use saved id in user !");
            }
            res.status(200).json({message : "User saved!",user});
        }catch(error){
            console.error('Internal Server Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }).get(async (req,res)=>{
        try{
            const user = await users.findOne({username : req.params.username}).populate("posts");;
            if (user){
                console.log("User found!");
                res.status(200).json(user.posts);
            }else{
                console.log("User not found!");
                res.status(404).json({ error: 'user not found' });
            }
        }catch(error){
            console.error('Internal Server Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }).delete(async (req,res)=>{
        try{
            const user = await users.findOne({username : req.params.username});
            user.posts.map(async (elm)=>{
                await posts.findByIdAndDelete(elm);
            })
            user.posts=[];
            await user.save();
            console.log("delete! All posts");
            res.status(200).send("delete! All posts");
        }catch(error){
            console.error('Internal Server Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    })
    Router.route('/users/:username/posts/:id')
    .put(async (req,res)=>{
        try{
            const usr = await users.findOne({username: req.params.username});
            if (!usr){
                res.status(404).send({message:"user not found !"});
                console.log("user not found!");
                return ;
            }
            const post = await posts.findOneAndUpdate({_id:req.params.id},{
                username:req.body.username,
                description:req.body.description,
                date:req.body.date
            },{new:true});
            if (!post){
                res.status(404).send({message:"post not found !"});
                console.log("post not found!");
                return ;
            }
            res.status(200).send({message:"update post successfully",post});
        }catch(error){
            console.error('Internal Server Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }).delete(async (req,res)=>{
        try{
            await posts.findOneAndDelete({_id: req.params.id});
            const usr = await users.findOne({username: req.params.username});
            if (!usr){
                res.status(404).send({message:"user not found !"});
                console.log("user not found!");
                return ;
            }
            usr.posts = usr.posts.filter((elm) => elm._id != req.params.id);
            await usr.save();
            res.status(200).json("success!");
        }catch(error){
            console.error('Internal Server Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }).get(async (req, res) => {
        try {
            const usr = await users.findOne({ username: req.params.username }).populate("posts");
            if (usr) {
                const foundPost = usr.posts.findOne((elm) => elm._id == req.params.id);
                if (foundPost) {
                    res.status(200).json({ post: foundPost, message: 'Successfully found!' });
                } else
                    res.status(404).json({ message: 'Post not found' });
            } else {
                console.log("User not found");
                res.status(404).json({ error: 'User Not Found' });
            }
        } catch (error) {
            console.error('Internal Server Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
module.exports = Router;