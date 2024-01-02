const express = require('express')
const app = express();
require('dotenv').config()
const Port = process.env.PORT || 3003 ;
require('./dbs/connection')
const cors = require('cors')
app.use(express.json());
const authRoutes = require('./routers/authRouter')
const postRoutes = require('./routers/postRouter')
const profileRouter = require('./routers/profileRouter')
const chatRouter = require('./routers/chatRouter')

app.use(cors({
    origin:['http://localhost:5173'],
    credentials:true,
}));

app.use('/api/users' , authRoutes)
app.use('/api/post' , postRoutes)
app.use('/api/profile' , profileRouter)
app.use('/api/chat' , chatRouter)

app.get('/' , (req,res)=>res.send('Server Is LIVE'));

app.listen(Port, (err)=>console.log('listening at' , Port));