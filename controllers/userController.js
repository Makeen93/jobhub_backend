const User = require("../models/User");
const CryptoJS = require("crypto-js");

module.exports = {
    updateUser: async (req, res) => {
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET).toString();
        }
        try {
            const UpdateUser = await User.findByIdAndUpdate(
                req.params.id, {
                $set: req.body
            }, { new: true }
            );
            const { password, __v,createdAt, ...others } = updateUser._doc;
            res.status(200).json(others);
        }
        catch (error) {
            res.status(500).json(error);
        }
    },


    deleteUser: async (req, res) => {
        try {
            await User.findByIdAndDelete(req.params.id) 
            res.status(200).json("Account Successfully Deleted");
        }
        catch (error) {
            res.status(500).json(error);
        }
    },
    getUser: async (req, res) => {
        try {
            const user=await User.findById(req.params.id);
            const {password,__v,createdAt,updatedAt,...userData}= user._doc;
            res.status(200).json(userData);
        }
        catch (error) {
            res.status(500).json(error);
        }
    },
    getAllUsers: async (req, res) => {
        try {
            const AllUsers=await User.find();
            res.status(200).json(AllUsers);
        }
        catch (error) {
            res.status(500).json(error);
        }
    },


}