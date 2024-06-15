### My First MERN project
## This Documentation can guide a beginner to setup a project easily
### node initialization
### jSON 
### Database connection to mongodb
make a database folder and make a file index.js inside that 
in the index file write a function for database connection
- mongoose.connect(ConnectionString);
yo much add your link of database to connectionstring variable
### Model creation
- create a new file in models folder
- export module.exports = mongoose.model('modelName', new mongoose.Schema({
    ,}));
    ### Controller creation
    - create a new file in controllers folder
    - export module.exports = {
        ,};
        ### Route creation
        - create a new file in routes folder
        - export module.exports = router;
        - router.get('/api/route', controllerFunction);
        - router.post('/api/route', controllerFunction);
        ### Server creation
        - create a new file in root directory
        - import express from 'express';
        - import routes from './routes';
        - const app = express();
        - app.use(express.json());
        - app.use('/api', routes);
        - const port =  , ;
        - app.listen(port, () => console.log(`Server started on port ${port}`
        - ));
        ### Start server
        - node server.js
        - open your browser and go to http://localhost:port/api/route
        - you can see your data in json format
        - you can use postman to test your api

        ### database crud
        - router.create({}) // insert a data into the  table 
        - router.find(); 
        - router.findById(id)
        - router.findByIdAndUpdate(id,{username = username },{new:true});
        - router.findByIdAndDelete(id);

        ### Types of APIS

        - rest api (path are different in different different verbs)
        - restful api (path are same in all verbs )
        Note : for the good practice we have to use restful api 

      ### File handeling
      - multer is a middleware that helps to handle multipart/form-data, which is primarily used for uploading
      files. It is written on top of busboy and is designed to handle the complexities of multipart
      forms. Multer adds a body object and a file or files object to the request object.
      - `npm install multer`
      - const multer = require('multer');
      - const upload = multer({ dest: './uploads/' });
      - router.post('/upload', upload.single('file'), (req, res) => {
        res.send(`/${req.file.path}`)
        - });
        - router.post('/upload', upload.array('files', 12), (req, res))
        - res.send(req.files.map(file => `/${file.path}`
        - ));

 ## Documentation of apis 
        > https://documenter.getpostman.com/view/35190210/2sA3XJjQCS

        ### Cors package
        - cors is a package that allows cross-origin resource sharing. It allows a server to indicate any
        origins (domain, scheme, or port) other than its own from which a cross-origin resource
        can be requested.
        - `npm install cors`
        - const cors = require('cors');
        - app.use(cors());
        - app.use(cors({origin: '*'}));
        - app.use(cors({origin: 'http://localhost:3000'}));
        - app.use(cors({origin: ['http://localhost:3000', 'http://localhost]}))

        

