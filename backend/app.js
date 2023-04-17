const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const path = require("path")
const errorMiddleware = require('./middlewares/error')
const cookieParser = require('cookie-parser')

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))

const auth = require('./routes/auth')
const report = require('./routes/report')


app.use('/api/v1', auth)
app.use('/api/v1', report)



app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});



app.use(errorMiddleware)

module.exports = app