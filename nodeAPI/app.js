const express = require('express');
const app = express();
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const morgan = require('morgan');
const expressValidator = require('express-validator');
const cors = require('cors');

// import mongoose
const mongoose = require('mongoose');
// load env variables
const dotenv = require('dotenv');
dotenv.config()

//db connection
mongoose.connect(
  process.env.MONGO_URI,
  {useNewUrlParser: true}
)
.then(() => console.log('DB Connected'))

mongoose.connection.on('error', err => {
  console.log(`DB connection error: ${err.message}`)
});

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
app.use("/", postRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use(function(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
      res.status(401).json({ error: 'Unauthorized!' });
  }
});

const port = 8080;
app.listen(port, ()=>{console.log(`a node js api is listening on: ${port}`)});