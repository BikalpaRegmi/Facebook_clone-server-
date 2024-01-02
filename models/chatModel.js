const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types  ;

const chatSchema = new mongoose.Schema(
  {
    members: {
      type:Array,
    },
  },{timestamps:true}
);

const Chat = new mongoose.model('Chats', chatSchema);
module.exports = Chat; 