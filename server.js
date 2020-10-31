const express = require("express");
// const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();


// parse requests of content-type - application/json
app.use(express.json());


// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


// connect to db
const db = require("./models");
const Role = db.role;

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
    initial();
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
});


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Hi! I am the server!" });
});

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

require("./routes/auth.routes")(app);
require("./routes/addressupdate.routes")(app);

function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'user' to roles collection");
        });

        new Role({
            name: "moderator"
          }).save(err => {
            if (err) {
              console.log("error", err);
            }
    
            console.log("added 'moderator' to roles collection");
          });
    
  
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'admin' to roles collection");
        });
      }
    });
  }
  