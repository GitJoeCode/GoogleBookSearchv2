// Require mongoose
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var BookSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    authors: [{
        type: String,
        required: true
    }],
    description: {
        type: String
    },
    image: {
        type: String
    },
    link: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// This creates our model from the above schema, using mongoose's model method
var Book = mongoose.model("Book", BookSchema);

// Export the Example model
module.exports = Book;
