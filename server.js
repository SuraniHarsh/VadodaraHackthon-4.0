const { json } = require("body-parser");
const express = require('express')
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();

const app = express();
connectDb();

const port = process.env.PORT;

app.use(express.json());
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/lessonRequest", require("./routes/lessonRequestRoutes"));
app.use("/api/v1/search", require("./routes/searchRoutes"));
app.use("/api/v1/rating", require("./routes/ratingRoutes"));

app.listen(port, (req, res) =>{
    console.log(` => http://localhost:${port}/ :)`);
});