//server initialization
const express = require('express');
const app = express();
const port = 3000;
// require database for connect the database 
const connectToDatabase = require('./database/index.js');

// require database table to access in this project 
const Book = require('./model/bookModel.js');
const User = require('./model/userModel.js');

// multer config
const {multer, storage} = require('./middleware/multerConfig.js');
const upload = multer({storage : storage})

// use req.body 
app.use(express.json());
app.use(express.static("./storage/")); 

// connnection to database 
connectToDatabase();

//example 
app.get('/',(req,res)=>{
    res.send("This is home page this will be fine soon !");
});


// create a post api 
app.post("/book",upload.single('image'), async(req,res)=>{
    let fileName = req.file.filename
    if(!req.file){
        fileName ="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=";
    }else{
        fileName = "http://localhost:3000/" + fileName; 
    }
    const {bookName,publication, bookPrice, isbnNumber, authorName, publishedAt} = req.body;
    await Book.create({
        bookName,
        bookPrice,
        isbnNumber,
        authorName,
        publishedAt,
        publication,
        imageUrl:fileName

    })
    res.status(201).json({
        "message": "Book added successfully"
    })
})

// // post opearation of user 
// app.post("/user", async(req,res)=>{
//     const {name,username,email,password,role,age} = req.body
//     await User.create({
//         name,
//         username,
//         email,
//         password,
//         role,
//         age
//     })
//     res.status(201).json({
//         message: "successfully create a post method"
//     })
// })

// // ---------- read one  user using username --------------------------------
// app.get("/user/:username",async(req,res)=>{
//     const username = req.params.username;
//     const user = await User.findOne({username});
//     res.status(200).json({
//         message : "successfully fetched data",
//         data : user
//     })
// })
// // -----  all user read ---------------
// app.get("/user",async(req,res)=>{
//     const users = await User.find(); // return array
    
//     res.status(200).json({
//         message: "users fetch successfully",
//         data: users
//     });
// })

//All books  read
app.get("/book",async(req,res)=>{
    const books = await Book.find(); // return array
    
    res.status(200).json({
        message: "books fetch successfully ",
        data: books
    });
})

//single book read
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
        message: " single book fetch successfully",
        data: book
    })

  }catch(err){
    res.status(500).json({
        message: "internal server error"
    })
  }
})

// delete operation
app.delete("/book/:id",async(req,res)=>{
    const id = req.params.id;
    await Book.findByIdAndDelete(id);

res.status(200).json({
    message: "book deleted successfully",
})
})

// ------- update operation ------------
// app.put("/book/:id",async(req,res)=>{
//     const id = req.params.id;
//     const book = await Book.findByIdAndUpdate(id,req.body,{new:true});
//     res.status(200).json({
//         message: "book updated successfully",
//         data: book
      
//         })
//     })

    // using patch method edit the book information 
app.patch("/book/:id",async(req,res)=>{
    const id = req.params.id;
    const {bookName,publication, bookPrice, isbnNumber, authorName, publishedAt} = req.body;
    const book = await Book.findByIdAndUpdate(id,{
        bookName,
        publication,
        bookPrice,
        isbnNumber,
        authorName,
        publishedAt
    })
    res.status(200).json({
        message: "book updated successfully",
        data: book
    })
})

// port for the server 
app.listen(port,()=>{
    console.log("The server is starting from the port number:"+ port);
})