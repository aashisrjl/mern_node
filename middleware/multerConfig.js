const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req,file,path){
        console.log(file);
        path(null,'./storage');
    },
    filename: function(req,file,path){
        path(null,file.originalname);
    }

})

module.exports ={
    multer,
    storage
}