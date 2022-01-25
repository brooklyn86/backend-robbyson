const mongoose   = require('../database');


module.exports = () => {
    const TaskSchema = new mongoose.Schema({
        name: {
            type: String,
            require: true,
        },
        description: {
            type: String,
            require: true,
        },
        duedate: {
            type: Date,
            require: false,
        },
        done: {
            type: Boolean,
            default: false,
            require: false,
        },
        hide: {
            type: Boolean,
            default: false,
            require: false,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    });

    return mongoose.model('Tasks', TaskSchema);

};