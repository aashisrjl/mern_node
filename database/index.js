const ConnectionString = "mongodb+srv://aashis:mongodb123@cluster0.oqvpew4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const mongoose = require('mongoose');
const { Schema } = mongoose;

async function connectToDatabase(){
    try{
    await mongoose.connect(ConnectionString);
    console.log("Database Connected successsfully");
    }
    catch(err){
        console.log("Error in connecting to database",err);
    }
}

module.exports = connectToDatabase