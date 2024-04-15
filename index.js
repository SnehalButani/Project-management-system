require('dotenv').config();
const express = require("express");
const app = express();
const { userRouter } = require('./routes/main.js');
const { sequelize } = require("./models");
const { PORT } = require("./config/config.js");



sequelize.sync({ force: false })
    .then(() => console.log("DB connected"))
    .catch((error) => console.log("------------------ DB connection error ------------------", error));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(userRouter);
app.get("/", (req, res) => {res.status(200).send("Project Management System")})



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