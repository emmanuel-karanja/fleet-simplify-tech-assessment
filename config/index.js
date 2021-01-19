const dotenv =require('dotenv');

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports={
 //your fav port
  port: parseInt(process.env.PORT, 10),

  //mongo db url--the long string from Atlas
  databaseURL: process.env.MONGODB_URI,

  //CORS
  cors:{
   enableCors: process.env.ENABLE_CORS,
   allowedOrigin:process.env.ALLOWED_ORIGIN,
  },
  
  jwtSecret: process.env.JWT_SECRET,

  api: {
    prefix: process.env.REST_API_PREFIX,
  },
};
