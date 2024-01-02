const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types  ;

const msgSchema = new mongoose.Schema({
  chatId: {
    type: String,
  },
    senderId: {
      type:String,
    },
    text: {
        type:String,
    }
},{timestamps:true});

const MSG = new mongoose.model('Messages', msgSchema);
module.exports = MSG