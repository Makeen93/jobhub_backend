const Chat = require("../models/Chat");
const User = require("../models/User");

module.exports = {
    accessMessage: async (req, res) => {
        const{userOd}=req.body;
        if(!userId){
            return res.status(400).json({
                message: "Invalid user ID"
            });
        }
        var isChat=await Chat.find({isGroupChat:false,$and:[{
            users:{$elemMatch:{$eq:req.user.id}},
        },{
            users:{$elemMatch:{$eq:userId}},
        }]})
        .populate("users","-password")
        .populate("latestMessage");
        isChat=await User.populate(isChat,{path: "latestMessage.sender",
        select: "username profile email"});
        if(isChat.length>0){
            res.send(isChat[0]);
        }
        else{
            var chatData={
                chatName:req.user.id,
                isGroupChat:false,
                users:[req.user.id,userId],
            };
            try{
                const createdChat=await Chat.create(chatData);
                const FullChat=await Chat.findOne({_id:createdChat._id}).populate("users","-password");
                res.status(200).json(FullChat);
            }catch(erorr){
            res.status(400).json("failed to create the chat",)

            }
        }
    },
    getChat: async (req, res) => {
        try {
            Chat.find({ users: { $elemMatch: { $eq: req.User.id } } })
                .populate("users", "-password")
                .populate("groupAdmin", "-password")
                .populate("latestMessage")
                .sort({ updateAt: -1 })
                .then(async (result) => {
                    results = await User.populate(results, { path: "latestMessage.sender", select: "username profile email" });
                    res.status(200).send(result);
                })
        } catch (errors) {
            res.status(500).json("failed to retrieve chat",)
        }
    }
}