const User=require("../models/User");
const CryptoJS=require("crypto-js");
const jwt=require("jsonwebtoken");
module.exports = {
    createUser: async (req, res) => {
        const newUser=new User({
            userName:req.body.username,
            email:req.body.email,
            password:CryptoJS.AES.encrypt(req.body.password,process.env.SECRET).toString(),

        });

        try{
            const savedUser=await newUser.save();
            res.status(201).json(savedUser);
        }catch(error){
            res.status(500).json(error);
        }
    },
    loginUser:async (req, res)=> {
        try{
            const user=await User.findOne({email:req.body.email});
            // !user&&res.status(401).json("Wrong Login Details");
            if(!user){return res.status(401).json("Wrong Login Details");}
            // 
            const decryptedpass=CryptoJS.AES.decrypt(user.password,process.env.SECRET);
            const depassword=decryptedpass.toString(CryptoJS.enc.Utf8);
            depassword!==req.body.password&&res.status(401).json("Wrong Password");
            const {password,__v,createdAt,...others}=user._doc;
            const userToken=jwt.sign({
                id:user._id,isAdmin:user.isAdmin,isAgent:user.isAgent
            },process.env.JWT_SEC,{expiresIn:"21d"})
               return res.status(200).json({...others,userToken});

        }catch(error){
            return res.status(500).json(error)
        }
    },
}