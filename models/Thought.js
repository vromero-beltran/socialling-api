const mongoose = require('mongoose');

const reactionSchema = require('./Reaction');
const { Schema, model } = mongoose;
const dateFns = require('date-fns');
const { format } = dateFns;
const dateFormat = (date) => format(date, 'MM/dd/yyyy');

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
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true
        }
    }
);


const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought; 