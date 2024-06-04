const express = require('express');
const app = express();
const port = 3000;
const connectToDatabase = require('./database/index.js');
connectToDatabase();

app.get('/',(req,res)=>{
    res.send("This is home page this will be fine soon !");
});
app.get('/apicheck',(req,res)=>{
   res.status(200).send({
    "messasge":"success"

   })
});

app.listen(port,()=>{
    console.log("The server is starting from the port number:"+ port);
})