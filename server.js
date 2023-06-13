import express from 'express';
import cookieParser from 'cookie-parser'
import http from 'http';
import bodyParser from 'body-parser';
import db from "./db/connect.js";
import useAppRoutes from './routes/appRoutes.js';
import dotenv from "dotenv";
import googleapi from "./api/index.js";
import cors from "cors";

// googleapi( "I'm sorry to hear that you're feeling depressed, and I want you to know that it's okay to feel that way. Sometimes life can be challenging, and it's normal to experience ups and downs. However, it's important to remember that things can and will get better. You have the strength and resilience to overcome these tough times, and there are people who care about you and want to support you. It's okay to reach out for help, whether it's from a friend, family member, or professional. You are not alone, and there is always hope for a brighter future. Remember that each day is a new opportunity to take small steps towards feeling better, and every step counts. Keep pushing forward, and don't give up on yourself. You are worthy of love and happiness, and I believe in you.")
//   .then(data => {
//     console.log(JSON.stringify(data, null, 2));
//   })
//   .catch(err => {
//     console.error(err);
//   });


dotenv.config();
const app = express();

const ORIGIN = '*';

const corsOptions ={
  // credentials: true,
  origin:ORIGIN
    
  }
  // var allowCrossDomain = function(req, res, next) {
  //   // res.header("Access-Control-Allow-Origin", ORIGIN);
  //   next();
  // };
  // app.use(allowCrossDomain);
  app.use(cors(corsOptions))
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.json()); // to know the data send is json type
  // Add the cookie-parser middleware
  app.use(cookieParser());


  useAppRoutes(app);

// server.js




export default app;


  
const PORT = 5000;

const httpServer = http.createServer(app);
httpServer.listen(5000,()=>{console.log("Server started on port 5000")});





















// import express from 'express';
// import cookieParser from 'cookie-parser'
// import http from 'http';
// import bodyParser from 'body-parser';
// import db from "./db/connect.js";
// import useAppRoutes from './routes/appRoutes.js';
// import dotenv from "dotenv";
// import googleapi from "./api/index.js";

// // googleapi( "I'm sorry to hear that you're feeling depressed, and I want you to know that it's okay to feel that way. Sometimes life can be challenging, and it's normal to experience ups and downs. However, it's important to remember that things can and will get better. You have the strength and resilience to overcome these tough times, and there are people who care about you and want to support you. It's okay to reach out for help, whether it's from a friend, family member, or professional. You are not alone, and there is always hope for a brighter future. Remember that each day is a new opportunity to take small steps towards feeling better, and every step counts. Keep pushing forward, and don't give up on yourself. You are worthy of love and happiness, and I believe in you.")
// //   .then(data => {
// //     console.log(JSON.stringify(data, null, 2));
// //   })
// //   .catch(err => {
// //     console.error(err);
// //   });


// dotenv.config();
// const app = express();

// const corsOptions ={
//     origin:'*',
//     "access-control-allow-credentials":true,
    
//   }
//   var allowCrossDomain = function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//    res.header("Access-Control-Allow-Headers", "Origin", "X-Requested-With", "Content-Type","Accept");
//     next();
//   };
//   app.use(allowCrossDomain);

//   //app.use(cors(corsOptions))
//   app.use(bodyParser.urlencoded({ extended: true }));
//   app.use(express.json()); // to know the data send is json type
//  app.use(cookieParser());
//   useAppRoutes(app);



  
// const PORT = 5000;

// const httpServer = http.createServer(app);
// httpServer.listen(5000,()=>{console.log("Server started on port 5000")});

