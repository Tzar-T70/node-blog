//import mongoose
const mongoose = require('mongoose');
// import schema, defines structure of what is stored in Blog table in database
const Schema = mongoose.Schema;

//create a new schema
const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {timestamps: true}); //auto makes 'created at' property etc

//initialise model (connect to db), store in Blog var
const Blog = mongoose.model('Blog', blogSchema);
//export the blog var to other files
module.exports = Blog;