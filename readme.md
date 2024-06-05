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

