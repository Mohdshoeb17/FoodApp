const express =require('express');
const app=express();
require('./models/db.js')
const bodyParser=require('body-parser');
const AuthRouter=require('./Routes/AuthRouter');
const productRouter=require('./Routes/productRouter');
const cors=require('cors')
require('dotenv').config();
const PORT =process.env.PORT||8080;
app.get('/',(req,res)=>{
   res.send('hello')
})
app.use(bodyParser.json());
app.use(cors());
app.use('/auth',AuthRouter);
app.use('/products',productRouter);
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})