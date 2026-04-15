const express = require("express")
const cors = require('cors')
const connectDB = require("./config/db")
const { connectKafka } = require("./config/kafka")
require('dotenv').config()

const app = express()
const port = 3003

app.use(cors({origin:'http://localhost:3000'}))
connectDB()
connectKafka().catch(console.error);

app.listen(port , () => {
    console.log(`Payment Service listening at  http://localhost:${port}`);
})