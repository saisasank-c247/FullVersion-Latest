const mongoose = require("mongoose");

const CreatePage = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    content: {
        type: String,
    },
    status: {
        type: String,
        required: false
    },
    template: {
        type: String,
        required: false

    },
    image: {
        type: String,
        required: false

    }
});

const CreatePageModel = mongoose.model("CreatePage", CreatePage);

module.exports = CreatePageModel;