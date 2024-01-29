const express = require("express");
const cors = require("cors")
const dotenv =require("dotenv").config();
const bodyparser = require("body-parser")
const db = require("./helper/db")
const userRoute = require("./Routes/userRoute")
const app = express();
app.use(cors());
app.use(express.json())
app.use(userRoute)
db();
app.listen(process.env.PORT,()=>{
    console.log("Listening");
})
