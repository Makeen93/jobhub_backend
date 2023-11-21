const Chat = require("../models/Chat");
const Message=require("../models/Message");
const User=require("../models/User");

module.exports = {
    getAllMessages:async(req,res)=>{
        try{
            const pagesize=12;
            const page=req.query.page||1;
            const skipMessage=(page-1)*pagesize;
            var messages=await Message.find({chat:req.params.id})
                .populate("sender","userName profile email")
                .populate('chat')
                .sort({createdAt:-1})
                .skip(skipMessage)
                .limit(pagesize);
                messages=await User.populate(messages,{path:"chat.users",select:"userName profile email"});
                res.json(messages);
        }catch(error){
            res.status(500).json({error:"Could not retrieve messages"});
        }
    },
    sendMessage:async(req,res)=>{
        const{content,chatId,receiver}=req.body;
        if(!content||!chatId){
            console.log("Invalid data");
            return res.status(400).json("Invalid Data");
        }
        var newMessage={
            sender:req.user.id,
            content:content,
            receiver:receiver,
            chat:chatId
        };

        try{
            var message=await Message.create(newMessage);
            message=await message.populate("sender","userName profile email")
            message=await message.populate("chat")
            message=await User.populate(message,{path:"chat.users",select:"userName profile email"});
            await Chat.findByIdAndUpdate(req.body.chatId,{latestMessage:message});
            res.json(message);
        }catch(error){
            res.status(400).json({error:error});
        }
    },


}