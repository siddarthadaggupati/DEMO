const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    author:{
        type : String,
        required : true
    },
    isbn:{
        type : Number,
        required : true,
        unique : true
    }
})

module.exports = mongoose.model('Book', bookSchema);
