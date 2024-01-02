const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const authentication = require("../middleware/authentication");
const Chat = require('../models/chatModel');
const Msg = require('../models/msgModel')

//to create chat
router.route('/createchat').post(async (req, res) => {
    try {
        const newChat = new Chat({ members: [req.body.senderId, req.body.receiverId] });
        const result = await newChat.save();
        res.json(result);

    } catch (error) {
        res.send(error)
    }
})

//to get  chats
router.route('/userchats/:userId').get(async (req, res) => {
    try {
        const {userId} = req.params
        const chat = await Chat.find({ members: { $in: [userId] } });
        res.json(chat);

    } catch (error) {
        res.send(error)
    }
})

//to find individual chat
router.route('/find/:fId/:sId').get(async (req, res) => {
    try {
        const chat = await Chat.findOne({ members: { $all: [req.params.fId, req.params.sId] } });
          res.json(chat)
    } catch (error) {
        res.send(error)
    }
})

//to insert message
router.route('/addmsg').post(async (req, res) => {
    try {
        const { chatId, senderId, text } = req.body;
        const message = new Msg({ chatId, senderId, text });
        const result = await message.save();
        res.json(result);

    } catch (error) {
        res.send(error)
    }
})

//to get messages
router.route('/getmsg/:chatId').get(async (req, res) => {
    try {
        const { chatId } = req.params;
        const result = await Chat.find({ chatId: chatId });
        res.json(result);
    } catch (error) {
        res.send(error)
    }
})
module.exports = router