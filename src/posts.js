    const express = require('express');
    const Router = express.Router();
    const posts = require('../models/postes');
    const users = require('../models/users');
    Router.route('/users/:username/posts')
    .post(async (req, res) => {
        try{
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
    })
module.exports = Router;