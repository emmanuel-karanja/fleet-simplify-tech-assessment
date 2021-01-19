const config=require('../config');
const  express = require('express'),
    morgan=require('morgan'),
    bodyParser=require('body-parser'),
    methodOverride=require('method-override'),
    path=require('path'),
    helmet=require('helmet');

const {setupRestRoutes}=require('../modules');

const errorHandler=require('../helpers/errorHandler');
const cors=require('cors');


const environment=process.env.NODE_ENV;
const allowedOrigin=config.cors.allowedOrigin;

    


function createExpressApp() {
  const app = express();
  app.use(methodOverride());
  app.use(express.static(path.join(__dirname, 'public')));
  
  if(environment==='development')
      app.use(morgan());


  app.use(cors());
 app.all('/', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', allowedOrigin);
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
  });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));


  //app.use(helmet());
  //app.disable('x-powered-by');



  //health-check endpoint
  app.use('/ping', (req, res) => {
    res.status(200).json({response:'pong'});
  });
  //setup REST routes
  require('../modules')(app);  

  app.use(errorHandler)

  return app;
}

module.exports={createExpressApp};



