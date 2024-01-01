const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const Thought = require('./Thought');

const userSchema = new Schema(
    {
        userId: {
            type: String,
            unique: true,
            required: 'Please enter a user ID!',
            trim: true
        },
        first: {
            type: String,
            required: 'Please enter a first name!',
            trim: true
        },
        last: {
            type: String,
            required: 'Please enter a last name!',
            trim: true
        },
        age: {
            type: Number,
            required: 'Please enter an age!',
            trim: true
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            },
            Thought
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;