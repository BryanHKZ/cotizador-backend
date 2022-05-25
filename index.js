const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const registerRoutes = require("./src/routes");
// const db = require("./models");
const dotEnv = require("dotenv");

const db = require("./models");

const app = express();
const server = require("http").Server(app);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
dotEnv.config();

var PORT = process.env.PORT || 4000;

registerRoutes(app);

db.sequelize.sync().then(() => {
  server.listen(PORT, function () {
    console.log(`api rest run on port ${PORT}`);
  });
  //const server = app.listen(PORT, () => console.log(`api rest run on port ${PORT}` ));
});
