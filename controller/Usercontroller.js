const { HashPassword,comparePassword } = require("../helper/PasswordEnc&dec");
const { generateToken } = require("../helper/tokenauth");
const UserModel = require("../models/UserModel")

const RegisterUser =async (req,res)=>{
    try {
        const {name,email,password} = req.body;
        const User = await UserModel.findOne({email})
        if(User){
           return res.status(500).json({
                message:"User already exists"
            })
        }
        const hashPassword = await HashPassword(password);
        const user =await UserModel.create({name,email,password:hashPassword})
        res.status(200).json({
            message:"Success",
            user:user
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message:"error"
        })   
    }
}
const LoginUser =async (req,res)=>{
    try {
        const {email,password} = req.body;
        const User = await UserModel.findOne({email})
        if(!User){
           return res.status(500).json({
                message:"User Not exists login first"
            })
        }
        const token = await generateToken(User);
        res.cookie("Token",token);
        const comparepassword = await comparePassword(password,User.password);
        if (!comparepassword) {
            return res.status(500).json({
                message:"Password is incorrect"
            })
        }
        res.status(200).json({
            message:"Success login",
            user:User,
            token:token
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message:"error"
        })   
    }
}

module.exports = {RegisterUser,LoginUser}