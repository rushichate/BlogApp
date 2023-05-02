const express = require("express")
const { BlogModel } = require("../models/blog.model")


const blogRouter = express.Router()

blogRouter.post("/add",async(req,res)=>{
    try{
        const article = new BlogModel(req.body)
        await article.save()
        res.status(200).send({"msg":"New artical had been added"})
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

blogRouter.get("/",async(req,res)=>{
    try{
        const articals = await BlogModel.find({userID:req.body.userID})
        res.status(200).send(articals)
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

blogRouter.get("/:id",async(req,res)=>{
    const {id} = req.params
    const artical = await BlogModel.findOne({_id:id})
    try{
        if(req.body.userID==artical.userID){
            res.status(200).send(artical)
        }else{
            res.status(400).send({"msg":"You are not authorised"})
        }
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})


blogRouter.patch("/edit/:id",async(req,res)=>{
    const {id} = req.params
    const artical = await BlogModel.findOne({_id:id})
    try{
        if(req.body.userID==artical.userID){
            await BlogModel.findByIdAndUpdate({_id:id},req.body)
            res.status(200).send({"msg":"Artical Edited"})
        }else{
            res.status(400).send({"msg":"You are not authorised"})
        }
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

blogRouter.delete("/rem/:id",async(req,res)=>{
    const {id} = req.params
    const artical = await BlogModel.findOne({_id:id})
    try{
        if(req.body.userID==artical.userID){
            await BlogModel.findByIdAndDelete({_id:id})
            res.status(200).send({"msg":"Artical deleted"})
        }else{
            res.status(400).send({"msg":"You are not authorised"})
        }
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

module.exports = {
    blogRouter
}

