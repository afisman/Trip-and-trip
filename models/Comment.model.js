const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    commenter: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    commentedPlace: {
        type: String
    }

}, {
    timestamps: true
});

module.exports = model('Comment', commentSchema);