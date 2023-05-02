const express = require("express")
const { appConnect } = require("./db")
const { userRouter } = require("./routes/user.route")
const { blogRouter } = require("./routes/blog.route")
const { auth } = require("./middlewear/auth")
require("dotenv").config()


const app = express()

app.use(express.json())


app.use("/",userRouter)
app.use(auth)
app.use("/articals",blogRouter)


app.listen(process.env.port,async(req,res)=>{
    try{
        await appConnect
        console.log("Connected to DB");
    }catch(err){
        res.status(400).send({"msg":err.message})
        console.log("Not able to connect to DB")
    }
    console.log(`Server is running on port ${process.env.port}`)
})