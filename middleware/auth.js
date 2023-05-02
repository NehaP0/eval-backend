const jwt = require("jsonwebtoken")

const auth = (req, res, next)=>{

    const token = req.headers.authorization


    if(token){
        try{
            const decoded = jwt.verify(token, 'masai')
            if(decoded){
                req.body.user = decoded.user
                //console.log(req.body)
                next()
            }
            else{
                res.status(200).send({"msg" : "Invalid Token"})
            }

        }
        catch(err){
            res.status(200).send({"msg" : "Please login"})
        }
    }
    else{
        res.status(200).send({"msg" : "No token provided"})
    }
    

}

module.exports = auth