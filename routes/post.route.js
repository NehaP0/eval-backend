const express = require("express")
const PostModel = require("../models/posts.model")



const postRoutes = express.Router()

postRoutes.get("/", async(req, res)=>{
    const {user} = req.body
    const {device} = req.query
    try{
        if(device){
            const posts = await PostModel.find({$or: [{device}, {device}]})         
            res.status(200).send(posts)
        }
        else{
            const posts = await PostModel.find({user : user})        
            res.status(200).send(posts)
        }
    }
    catch(err){
        res.status(400).send({"err": err.message})
    }
})


postRoutes.post("/create", async(req, res)=>{
    const data = req.body
    try{
        const post = PostModel(data)
        await post.save()
        res.status(200).send({"msg" :"Post created"})        
    }
    catch(err){
        res.status(400).send({"err": err.message})
    }
})


postRoutes.patch("/update", async(req, res)=>{
    const {user} = req.body
    const {id} = req.body
    const updationdata = req.body
    const mypost = await PostModel.findOne({_id : id}) 
    try{
        if(user !== mypost.user){
            res.status(200).send({"msg" :"You are not authorized to do this"}) 
        }
        else{
            await PostModel.findByIdAndUpdate({_id : id}, updationdata)
            res.status(200).send({"msg" :"Post updated"})       
        }         
    }
    catch(err){
        res.status(400).send({"err": err.message})
    }
})


postRoutes.delete("/delete", async(req, res)=>{
    const {user} = req.body
    const {id} = req.body
    const mypost = await PostModel.findOne({_id : id}) 
    try{

        if(user !== mypost.user){
            res.status(200).send({"msg" :"You are not authorized to do this"}) 
        }
        else{
            await PostModel.findByIdAndDelete({_id : id})  
            res.status(200).send({"msg" :"Post deleted"})     

        }

    }
    catch(err){
        res.status(400).send({"err": err.message})
    }
})


module.exports = postRoutes




// title
// "my picture 2"
// body
// "my picture"
// device
// "iphone"