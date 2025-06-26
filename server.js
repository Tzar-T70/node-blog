//import npm libraries
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog'); //import model

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



//display all blogs
app.get('/all-blogs', (req,res) => {
  Blog.find()
  .then((result) => {
    res.send(result);// if no errors, send to browser
  })
  .catch((err) => {
    console.log(err);
  });
});

app.get('/single-blog', (req,res) => {
  Blog.findById('6857e7fdf2a4a469c9bb6a2f')
  .then((result) => {
    res.send(result);
  })
  .catch((err) => {
    console.log(err);
  });
});

app.get('/', (req, res) => {
  res.redirect('/blogs');
});
app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});


//blog routes
app.get('/blogs', (req,res) => {
  Blog.find().sort({createdAt: -1})
  .then((result) => {
    res.render('index', {title: 'All Blogs', blogs: result})
  })
  .catch((err) => {
    console.log(err);
  })
})


app.post('/blogs', (req,res) => {
  //add new blog to db
  const blog = new Blog(req.body);

  blog.save()
  .then((result) => {
    res.redirect('/blogs');
  })
  .catch((err) => {
    console.log(err);
  });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

app.get('/blogs/:id', (req,res) => {
  const id = req.params.id;
  Blog.findById(id)
  .then((result) => {
    res.render('details', {blog: result, title: 'Blog Details'});
  })
  .catch((err) => {
    console.log(err);
  });
});

app.delete('/blogs/:id', (req,res) => {
  const id = req.params.id;

  //delete id from database
  Blog.findByIdAndDelete(id)
  .then(result => {
    //cant do redirect straight up after del req, gotta work around it thru json response
      res.json({redirect: '/blogs'});
  })
  .catch((err) => {
    console.log(err);
  });
})



// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
