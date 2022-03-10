require('dotenv').config()
const express = require('express');
const app =express();
const mongoose = require('mongoose')
const db = require("./models");
const Role = db.role;
const cors = require("cors");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



db.mongoose
  .connect(process.env. DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Unathi  application." });
  });


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

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);


app.listen(4000,()=> console.log(`Server Started`))