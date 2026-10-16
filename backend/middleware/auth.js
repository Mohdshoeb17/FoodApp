const jwt = require('jsonwebtoken');
 const auth="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRzc3M3NUBnbWFpbC5jb20iLCJfaWQiOiI2OGE5M2YyYmEzZGEzNTk0ZDE0MDg5MTMiLCJpYXQiOjE3NTU5MjM1NzcsImV4cCI6MTc1NjAwOTk3N30.P8QgyOvN39S10Paf-L3VMEN8uWFM5YK975GQK571Qns"
const ensureAuthentication=(req,res,next)=>{
    //  const auth = req.headers['authorization'];

    if(!auth){
        return    res.status(403).json({message:'Unauthorized.jwt token is req'})
    }
    try {
  const  decoded=jwt.verify(auth,process.env.JWT_SECRET);
          req.user=decoded;
        next();
    } catch (error) {
        console.log(error);

        res.status(403).json({message:'Unauthorizd,jwt token wrong or expired',error})  
       
        
         
    }
}

module.exports=ensureAuthentication