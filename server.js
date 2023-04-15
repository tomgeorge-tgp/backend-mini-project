import express from 'express';
//import cookieParser from 'cookie-parser'
import http from 'http';
import bodyParser from 'body-parser';
import db from "./db/connect.js";
import useAppRoutes from './routes/appRoutes.js';
import dotenv from "dotenv";
import googleapi from "./api/index.js";

googleapi( "This is the best counseling website I've ever used. Thank you for all your help!")
  .then(data => {
    console.log(JSON.stringify(data, null, 2));
  })
  .catch(err => {
    console.error(err);
  });


dotenv.config();
const app = express();

const corsOptions ={
    origin:'*',
    "access-control-allow-credentials":true,
    
  }
  var allowCrossDomain = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin", "X-Requested-With", "Content-Type","Accept");
    next();
  };
  app.use(allowCrossDomain);

  //app.use(cors(corsOptions))
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.json());
 // app.use(cookieParser(process.env.JWT_SECRET));
  useAppRoutes(app);



  
const PORT = 5000;

const httpServer = http.createServer(app);
httpServer.listen(5000,()=>{console.log("Server started on port 5000")});

