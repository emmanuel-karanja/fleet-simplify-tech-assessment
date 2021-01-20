const config=require('../config');
const  mongoose=require('mongoose');
 
 
module.exports=async()=>{
    const db=await mongoose.connect(config.databaseURL,{
          useNewUrlParser: true,
          useCreateIndex: false,
          useUnifiedTopology: true 
        });

    return db;
}
