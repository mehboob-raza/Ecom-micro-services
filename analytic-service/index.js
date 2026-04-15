const express = require("express")
const cors = require('cors')
const connectDB = require("./config/db")
require('dotenv').config()

const app = express()
const port = 3001

app.use(cors({origin:'http://localhost:3000'}))
connectDB()
app.listen(port , () => {
    console.log(`Analytics Service listening at  http://localhost:${port}`);
})