const mongoose = require('mongoose');

const reactionSchema = require('./Reaction');
const { Schema, model } = mongoose;

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'Please enter your thought!',
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // use a getter method to format the timestamp on query
            get: (createdAtVal) => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: 'Please enter your username!'
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true
        }
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;