const express = require('express');
    const Router = express.Router();
    const posts = require('../models/postes');
    const users = require('../models/users');
const { json } = require('body-parser');
    Router.route('/users/:username/posts')
    .post(async (req, res) => {
        try{
            const userr = await users.findOne({username : req.params.username});
            const post = await posts.create({
                description: req.body.description,
                username: req.params.username,
                date: Date.now(),
            })
            console.log("User created!");
            await post.save();
            console.log("Use saved!");
            const user = await users.findOne({username: req.params.username});
            if (user){
                    console.log("User found!");
                    user.posts.push(post);
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
            res.status(200).json(user);
        }catch(error)
        {
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
    .put((req,res)=>{
        
    }).delete(async (req,res)=>{
        try{
            await posts.findOneAndDelete({id: req.params.id});
            // const usr = await users.findOne({username: req.params.username});
            // usr.posts.map((elm)=>{
            //     if(elm.id != req.params.id)
            //         usr.posts.push(elm);
            // });
            res.status(200).json("success!");
        }catch(error){
            console.error('Internal Server Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }).get(async (req, res) => {
        try {
            const usr = await users.findOne({ username: req.params.username }).populate("posts");
            if (usr) {
                const foundPost = usr.posts.find((elm) => elm.id == req.params.id);
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