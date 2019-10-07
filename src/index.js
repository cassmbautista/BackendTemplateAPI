let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let swaggerUi = require('swagger-ui-express');
let swaggerDocument = require('./swagger.json');

// Initialise the app
let app = express();

// Import routes
let router = require("./routes/routes");

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/basicbackend', { useNewUrlParser: true});
let db = mongoose.connection;

// Added check for DB connection
if(!db){
    console.log("Error connecting db")
}
else {
    console.log("Db connected successfully")
}

// Set default URL to swagger api docs
app.use(/^\/([^\/]+\.(html|css|js))?$/, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Use Api routes in the App
app.use('/', router);

// Setup server port
let port = process.env.PORT || 8080;

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running Basic Backend on port " + port);
});