const config=require('../config');
const  mongoose=require('mongoose');
 
 //a hack to mitigate the heroku .env issues
const DB_URI='mongodb+srv://karanja:admin12@demos-fleet-simplify-no.xevrc.mongodb.net/demo-db?retryWrites=true&w=majority'
module.exports=async()=>{
	console.log(DB_URI);
    const db=await mongoose.connect(DB_URI,{
          useNewUrlParser: true,
          useCreateIndex: false,
          useUnifiedTopology: true 
        });

    return db;
}
