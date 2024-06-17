//server initialization
const express = require('express');
const app = express();
const port = 3000;
// require database for connect the database 
const connectToDatabase = require('./database/index.js');

// to perform with file search delete 
const fs = require('fs');

// require database table to access in this project 
const Book = require('./model/bookModel.js');
const User = require('./model/userModel.js');

// multer config
const {multer, storage} = require('./middleware/multerConfig.js');
const upload = multer({storage : storage})

// use req.body 
app.use(express.json());
app.use(express.static("./storage/")); 

// cors package
const cors = require('cors')

app.use(cors({
    origin: '*'
}))

// connection to database 
connectToDatabase();

//example 
app.get('/',(req,res)=>{
    res.send("This is home page this will be fine soon !");
});


// create a post api 
app.post("/book",upload.single('image'), async(req,res)=>{
    let fileName
    if(!req.file){
        fileName ="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=";
    }else{
        fileName = "http://localhost:3000/" + req.file.filename; 
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

// // ------------- post operation of user ------------//
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

// // ---------- read one  user using username ------------------------//
// app.get("/user/:username",async(req,res)=>{
//     const username = req.params.username;
//     const user = await User.findOne({username});
//     res.status(200).json({
//         message : "successfully fetched data",
//         data : user
//     })
// })
// // ---------------  all user read ---------------------------//
// app.get("/user",async(req,res)=>{
//     const users = await User.find(); // return array
    
//     res.status(200).json({
//         message: "users fetch successfully",
//         data: users
//     });
// })

//----------user delete operation -----------------------------//
// app.delete("/user/:id",async(req,res)=>{
//     const id = req.params.id;
//     await User.findByIdAndDelete(id);

//     res.status(200).json({
//         message: "deleted user successfully",
//         data : null
//     })
// })

// //---------- user update operation --------------------------//
// app.patch("/user/:id",async(req,res)=>{
//     const id = req.params.id;
//     const {name,username,email,password,role,age} = req.body;
//     const users = await User.findByIdAndUpdate(id,{
//         name,
//         username,
//         email,
//         password,
//         role,
//         age
//     });
//     res.status(201).json({
//         message: "Successfully updated user info",
//         data: users
//     })
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
app.delete("/book/:id", upload.single('image'), async (req, res) => {
    try {
        const id = req.params.id;
        
        // Fetch the book data before deleting it
        const book = await Book.findById(id);
        console.log(book)
        if (!book) {
            return res.status(404).json({
                message: "Book not found",
            });
        }
        
        // Delete the book
        await Book.findByIdAndDelete(id);

        const imgUrl = book.imageUrl;
        const localHostUrlLength = "http://localhost:3000/".length;
        const oldImageUrl = imgUrl.slice(localHostUrlLength);

        // Delete the associated image file
        fs.unlink(`storage/${oldImageUrl}`, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Also the file is deleted");
            }
        });

        res.status(200).json({
            message: "Book deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred",
        });
    }
});


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
app.patch("/book/:id",upload.single('image'),async(req,res)=>{
    const id = req.params.id;
    const {bookName,publication, bookPrice, isbnNumber, authorName, publishedAt} = req.body;
    const oldData = await Book.findById(id);
    let fileName;
    if(req.file){
        // console.log(req.file)
        // console.log(oldData)
        const oldImagePath = oldData.imageUrl;
        console.log(oldImagePath)
        const localHostUrlLength = "http://localhost:3000/".length;
        const newOldImagePath = oldImagePath.slice(localHostUrlLength);
        console.log(newOldImagePath);

        fs.unlink(`storage/${newOldImagePath}`,(err)=>{
            if(err){
                console.log(err);
            }else{
                console.log("deleted successfully");
            }
        })
        fileName = "http://localhost:3000/" + req.file.filename



    }
    const book = await Book.findByIdAndUpdate(id,{
        bookName,
        publication,
        bookPrice,
        isbnNumber,
        authorName,
        publishedAt,
        imageUrl: fileName
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