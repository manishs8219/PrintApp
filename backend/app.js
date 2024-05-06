const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require("./connectDB");
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

dotenv.config();

const app = express();
const http = require("http").createServer(app);
// const io = require('socket.io')(http, {
//   cors: {
//     origin: '*'
//   }
// });

// const socket = require('./socket/socket')(io);

app.use(cors());
connectDB();
app.use(fileUpload());

// View engine setup (if needed)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Serve frontend files
// app.use(express.static(path.join(__dirname, '../frontend/dist')));

const frontendDistPath = path.resolve(__dirname, '../frontend/dist');
// Define routes
app.use('/', indexRouter);
app.use('/users', usersRouter);







// Serve static files from the dist directory
app.use(express.static(frontendDistPath));

// Route all requests to the index.html in the dist directory
app.get('*', (req, res) => {
  res.sendFile(path.resolve(frontendDistPath, 'index.html'));
});


// Catch all routes and serve the React app
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend/dist" ,"index.html"));
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error'); // Assuming you have an error handling view
});

const port = process.env.PORT || 3000; 
http.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
