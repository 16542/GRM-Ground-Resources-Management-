const jwt = require("jsonwebtoken")
require("dotenv").config()

const verfiyTokenAndAuthorization = (req,res,next)=>{
  const authHeader = req.headers.token
  if(authHeader){
    const token = authHeader.split(" ")[1]
    jwt.verify(token  , process.env.JWT_SEC , (err,user)=>{
      if(err) return res.status(400).json({message:"Token is not valid..."})
      req.user=user
      next()
    })
  }else{
    res.status(500).json({message:"You are not allowed to do that ..."})
  }
}

module.exports = verfiyTokenAndAuthorization