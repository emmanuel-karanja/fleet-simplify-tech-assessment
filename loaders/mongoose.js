const config=require('../config');
const  mongoose=require('mongoose');
 
module.exports=async()=>{
    const db=mongoose.connect(config.databaseURL,{useNewUrlParser:true,
        useUnifiedTopology:true,
        useFindAndModify:false, 
        useCreateIndex:false});

    return db;
}
