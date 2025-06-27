//import mongoose
const mongoose = require('mongoose');
// import schema, defines structure of what is stored in Blog table in database
const Schema = mongoose.Schema;

//create a new schema
const blogSchema = new Schema({
    title: {
        type: String,
        required:[true, 'Title is required.'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    snippet: {
        type: String,
        required: [true, 'Blog snippet is required'],
        trim: true,
        maxlength: [200, 'Snippet cannot exceed 200 characters']
    },
    body: {
        type: String,
        required: [true, 'Blog body is required']
    }
}, {timestamps: true}); //auto makes 'created at' property etc

//initialise model (connect to db), store in Blog var
const Blog = mongoose.model('Blog', blogSchema);
//export the blog var to other files
module.exports = Blog;