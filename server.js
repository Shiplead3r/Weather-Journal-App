// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Stats } = require('fs');
const port = 8080;
// Start up an instance of app
const app = new express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));

// Routes
// Add the new data
app.post('/add-data',add_data);

function add_data(req,res){
    projectData['temp'] = req.body.temp;
    projectData['date'] = req.body.date;
    projectData['feeling'] = req.body.feeling;
    console.log(JSON.stringify(projectData));
    res.send(['200 OK']);

}

// Get the saved data
app.get('/get-data',get_data);

function get_data(req,res){
    res.send(JSON.stringify(projectData));
}

// // We will use it to clear our project data
// app.get('/',function(){
//     projectData = {};
// });
// Setup Server
app.listen(port,function(){
    console.log(`Server start listening on port ${port}`);
});