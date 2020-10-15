const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const images = require("./routes/api/images");
const app = express();
const cors = require('cors');

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect("mongodb://mongodb", { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

app.use(passport.initialize());

require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/images", images);

const PORT = 8080; 
app.listen(PORT, () => console.log(`Server up and on port ${PORT} !`));
