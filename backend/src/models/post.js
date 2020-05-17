const mongoose = require("mongoose");

const post = mongoose.Schema.Types({
    title: {
        Type: String,
        required: true,
    },
    description: {
        Type: String,
        required: true,
    },
    imgUrl: {
        Type: String,
        required: true,
    },
    category: {
        Type: String,
        required: true,
    }
});