var mongoose = require("mongoose");



var blogschema = new mongoose.Schema({
    name: String,
    image: String,
    body: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    time:{type: Date, default: Date.now}
});

module.exports = mongoose.model("blog", blogschema);
