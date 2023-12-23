const express = require('express')
const app = express();
require('dotenv').config()
const Port = process.env.PORT || 3003 ;
require('./dbs/connection')
require('./models/userModel');
const cors = require('cors')
app.use(express.json());
const authRoutes = require('./routers/authRouter')
const postRoutes = require('./routers/postRouter')

app.use(cors({
    origin:['http://localhost:5173'],
    credentials:true,
}));

app.use('/api/users' , authRoutes)
app.use('/api/post' , postRoutes)

app.get('/' , (req,res)=>res.send('Server Is LIVE'));

app.listen(Port, (err)=>console.log('listening at' , Port));