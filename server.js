const express = require("express");
const morgan = require('morgan');
const bodyParser = require("body-parser");
const expressValidator = require('express-validator');
const upload = require('./app/config/multer.config.js');
const PORT = process.env.PORT || 8080;

//app
const app = express();

// development environment variables
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// db
const db = require("./app/models");
db.sequelize.sync();

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(expressValidator());

// routes
require('./app/routes/auth')(app);
require('./app/routes/user')(app);
require('./app/routes/file')(app, upload);
require('./app/routes/mail')(app);

// return of static in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});








