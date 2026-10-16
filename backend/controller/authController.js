const Usermodel = require("../models/user");
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
const signup=async(req,res)=>{
    try {
       const {name,email,password} =req.body;
       console.log(name);
       
       const user=await Usermodel.findOne({email})
       if(user){
        return res.status(400).json({message:'User is already exist '})
       }
       
   const hashpassword = await bcrypt.hash(password, 10)
       const usermodel=new Usermodel({name,email,password:hashpassword})
       await usermodel.save();
        res.status(201).json({success:true,message:'signup suceefully'})

    } catch (error) {
        console.log(error);
        
        res.status(500).json({message:'internal error',error})
        
    }
}
const login=async(req,res)=>{
    try {
       const {name,email,password} =req.body;
       const user=await Usermodel.findOne({email})
       if(!user){
        return res.status(403).json({message:'Auth failed'})
       }
      const isPassword= await bcrypt.compare(password, user.password);
     if(!isPassword){
        return res.status(403).json({message:'Auth failed'})
     }
    //  jwt Token
    const jwtToken=jwt.sign({email:user.email,_id:user._id},
        process.env.JWT_SECRET,
        {expiresIn:'24h'}
    )
   
    
    res.status(200).json({message:'login suceefully',
            success:true,
            jwtToken,
            email,
            name:user.name
        })

    } catch (error) {
        console.log(error);
        
        res.status(500).json({message:'internal error',error})
        
    }
}
module.exports={
    signup,
    login

}