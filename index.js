require('dotenv').config();
require('./routes/main.js');
const express = require("express");
const app = express();
const { sequelize } = require("./models");
const { PORT } = require("./config/config.js");
const bodyParser = require("body-parser");
const path = require("path");



sequelize.sync({ force: false })
    .then(() => console.log("DB connected"))
    .catch((error) => console.log("------------------ DB connection error ------------------", error));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'uploads/images')));

app.get("/", (req, res) => { res.status(200).send("Project Management System") })



// app.all("*", function (req, res, next) {
//     next(Error(`Invalid route ${req.method} ${req.url}`));
// });

app.use((err, req, res, next) => {
    console.log("err", err);
    return res.status(400).json({
        error: true,
        message: err.message || err.stack || "Something is wronging here"
    })
})


app.listen(PORT, () => {
    console.log(`Server is listening on server http://localhost:${PORT}`);
});