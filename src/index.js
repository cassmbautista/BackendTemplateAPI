let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let swaggerUi = require('swagger-ui-express');
let swaggerDocument = require('./swagger.json');
let cors = require("cors");

// Initialise the app
let app = express();

// Import routes
let router = require("./routes/routes");

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Setup Cors
app.use(
    cors({
      origin: true,
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      optionsSuccessStatus: 200,
      exposedHeaders: ["Content-Range"]
    })
  );

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
let swaggerUiOptions = {
    swaggerUrl: "/swagger",
    swaggerOptions: {
      validatorUrl: null,
      docExpansion: "none",
      tagsSorter: "alpha"
    }
  };
  app.get(
    /^\/([^\/]+\.(html|css|js))?$/,
    swaggerUi.serve,
    swaggerUi.setup(null, swaggerUiOptions)
  );
  app.get("/swagger", function(req, res, next) {
    res.json(swaggerDocument);
  });

// Use Api routes in the App
app.use('/', router);

// Setup server port
let port = process.env.PORT || 8080;

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running Basic Backend on port " + port);
});