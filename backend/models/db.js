const mongoose=require('mongoose');
const mongo_url=process.env.MONGO_url||'mongodb://localhost:27017/authxy';
mongoose.connect(mongo_url).then(()=>{
    console.log('mongo DB connection....')
}).catch((err)=>{
    console.log('mongo coonection error...',err)


})