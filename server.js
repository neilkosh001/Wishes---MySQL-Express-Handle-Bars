var express = require("express");
var bodyParser = require("body-parser");

var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "ilovegod",
  database: "wishes_db"
});

connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
  
    console.log("connected as id " + connection.threadId);
  });

  app.get("/", function(req, res) {
    connection.query("SELECT * FROM wishes;", function(err, data) {
      if (err) throw err;
  
      res.render("index", {wish: data });
    });
  });

  app.post("/", function(req, res) {

connection.query("INSERT INTO wishes (wish) VALUES (?)", [req.body.wish], function(err, result) {
        if (err) throw err;
    
        res.redirect("/");
      });
    });
    

    app.listen(PORT, function() {
        // Log (server-side) when our server has started
        console.log("Server listening on: http://localhost:" + PORT);
      });
      