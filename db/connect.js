// 1CbfHc28MZmLfrYy  tomgeorgetgp4187
//mongodb+srv://mini-project:<password>@cluster0.cio1zef.mongodb.net/?retryWrites=true&w=majority

import mongoose from 'mongoose';
import dotenv from "dotenv"
dotenv.config();
const db=mongoose
db.connect(process.env.MONGO_URI)



.then(() => console.log("Connected to database"))
.catch((err) => console.error("Could not connect to database", err));



// db.connect((error) => {
//     if(!error)
//     console.log('Connection has been established successfully.');
   
//     else
//     console.error('Unable to connect to the database: ', error);
//   });


export default db;
