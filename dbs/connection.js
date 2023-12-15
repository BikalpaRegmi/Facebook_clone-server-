const mongoose = require('mongoose')

mongoose.connect(process.env.MONGOURL).then(()=>{
    console.log('dbs connected sucessfully')
}).catch((err)=>console.log(err))

module.exports = mongoose ;