const express = require('express');
const app = express();
const port = 3000;
const connectToDatabase = require('./database/index.js');
const Book = require('./model/bookModel.js');
// use req.body 
app.use(express.json());

connectToDatabase();

app.get('/',(req,res)=>{
    res.send("This is home page this will be fine soon !");
});
app.get('/apicheck',(req,res)=>{
   res.status(200).send({
    "messasge":"success"

   })
});
// create
app.post("/book", async(req,res)=>{
    const {bookName,publication, bookPrice, isbnNumber, autherName, publishedAt} = req.body;
    await Book.create({
        bookName,
        bookPrice,
        isbnNumber,
        autherName,
        publishedAt,
        publication
    })
    res.status(201).json({
        "message": "Book added successfully"
    })
})

//All read
app.get("/book",async(req,res)=>{
    const books = await Book.find(); // returnn array
    
    res.status(200).json({
        message: "books fetch succesfully",
        data: books
    });
})

//single read
app.get("/book/:id",async(req,res)=>{
  try{
    const id = req.params.id;
    const book = await Book.findById(id);// return object
//    if(!book){
//     res.status(404).json({
//         message: "book not found"
//         })
//    }
    res.status(200).json({
        messgae: " single book fetch succesfully",
        data: book
    })

  }catch(err){
    res.status(500).json({
        message: "internal server error"
    })
  }
})


app.listen(port,()=>{
    console.log("The server is starting from the port number:"+ port);
})