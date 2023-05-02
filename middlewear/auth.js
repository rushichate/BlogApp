const jwt = require("jsonwebtoken")

const auth = (req,res,next)=>{
    const token = req.headers.authorization
    if(token){
        try{
            const decoded = jwt.verify(token.split(" ")[1], 'rushi')
            if(decoded){
                req.body.user = decoded.userName
                req.body.userID = decoded.userID
                next()
            }else{
                res.status(400).send({"msg":"Please Login"})
            }
        }catch(err){
            res.status(400).send({"msg":err.message})
        }
    }else{
        res.status(400).send({"msg":"Please Login"})
    }
}

module.exports = {
    auth
}