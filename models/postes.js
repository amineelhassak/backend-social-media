const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
const schemaposts = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
    },
    description: {
        type: String,
    },
    username: {
        type: 'string',
        // unique: true,
    },
    date: {
        type: Date,
    },
    commantaire: [{ type: mongoose.Schema.Types.ObjectId, ref: "commantaire" }],
    nlikes: {
        type: Number,
        default: 0,
    },
});
schemaposts.plugin(autoIncrement.plugin, {
    model: 'posts',
    field: 'id',
    startAt: 1,
    incrementBy: 1,
});

const Schemaposts = mongoose.model("posts", schemaposts);
module.exports = Schemaposts;
