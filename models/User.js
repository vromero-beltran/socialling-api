const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            unique: true,
            required: 'Please enter a user ID!',
            trim: true
        },
        firstName: {
            type: String,
            required: 'Please enter a first name!',
            trim: true
        },
        lastName: {
            type: String,
            required: 'Please enter a last name!',
            trim: true
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
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