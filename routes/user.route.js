const express = require("express")
const bcrypt = require("bcrypt")
const { UserModel } = require("../models/user.model")
const jwt = require("jsonwebtoken")



const userRouter = express.Router()

userRouter.post("/register",async(req,res)=>{
    const {name,email,password,city,age} = req.body
    try{
        bcrypt.hash(password, 4, async(err, hash)=> {
            const user = new UserModel({name,email,password:hash,city,age})
            await user.save()
            res.status(200).send({"msg":"New user has been added"})
        });
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try{
        const user = await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password,(err, result)=> {
                if(result){
                  const token = jwt.sign({ userID:user._id,userName:user.name }, 'rushi');
                res.status(200).send({"msg":"Login Sucsessfull","token":token})
                }else{
                    res.status(400).send({"msg":"Wrong Credentials"})
                }
            });
        }else{
            res.status(400).send({"msg":"Please register first"})
        }
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

module.exports = {
    userRouter
}