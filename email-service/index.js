const express = require("express")
const cors = require('cors')
const connectDB = require("./config/db")
const { connectKafka } = require("./config/kafka")
require('dotenv').config()

const app = express()
const port = 3004

app.use(cors({origin:'http://localhost:3000'}))
connectDB()
connectKafka();
app.listen(port , () => {
    console.log(`Email Service listening at  http://localhost:${port}`);
})