const router = require("express").Router();
const User = require("../models/User")
const CryptoJS = require("crypto-js")


router.post("/register",async (req, res)=>{
    const newUser = new User({
        username:req.body.email,
        email:req.body.email,
        password:CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
    })
    try{

        const user = await newUser.save();
        res.status(201).json(user)
    }
    catch(err){
        console.log(process.env.SECRET_KEY)
        res.status(500).json(err)
    }
})

router.post('/login',async (req,res)=>{
    try{
        const user = await User.findOne({email:req.body.email})
        !user && res.status(401).json( "No username is registered!")
        const bytes = CryptoJS.AES.decrypt(user.password,process.env.SECRET_KEY)
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8)
        
        originalPassword!==req.body.password &&
        res.status(401).json("Wrong Password")

        res.status(200).json({message:"loggedin Succesfully"})

    }
    catch(err){

    }
})

module.exports= router