//import npm libraries
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// initialize express app
const app = express();

//connect to mongodb using mongoose
const dbURI = 'mongodb+srv://tzart70:bvjbd96L1Oaia8xR@node-test.rakz0iv.mongodb.net/node-blog?retryWrites=true&w=majority&appName=node-test';
mongoose.connect(dbURI)
  .then(() =>  app.listen(3000)) //listen for requests from browser
  .catch((err) => console.log(err)); //show errors in console

// register view engine (allows dynamic web pages)
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public')); // browser can access public folder
app.use(express.urlencoded()); //allows form data to be used in req var in post request
app.use(morgan('dev')); //sends browser request info in terminal


//routes
app.get('/', (req, res) => {
  res.redirect('/blogs'); //make this a separate homepage
});
app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});


//blog routes - in separate file
app.use('/blogs',blogRoutes);


// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
