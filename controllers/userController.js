const { User } = require('../models');
const { Thought } = require('../models');

const {v4: uuidv4} = require('uuid');

// module export
module.exports = {

    // get all users
    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // get a single user by id
    async getUserById(req, res) {
        try {
            const user = await User.findById(req.params.userId).select('-__v');
            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID.' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // create a new user and generate a random ID using UUID
    async createUser(req, res) {
        try {
            const id = uuidv4();
            
            const user = await User.create({
                userId: id,
                ...req.body
            });
            res.status(201).json(user);
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: 'Something went wrong.' });
        }
    },

    // update a user's first name and last name by id
    async updateUser(req, res) {
        try {
            const user = await User.findByIdAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID.' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // delete a user with thought by id
    async deleteUser(req, res) {
        try {
            const user = await User.findByIdAndDelete({ _id: req.params.userId });
            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID.' });
            }
            res.json({ message: 'User deleted!' });;
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // add a friend to a user's friend list
    async addFriend(req, res) {
        try {
            const friend = await User.findById(req.params.friendId);
            const user = await User.findByIdAndUpdate(
                { _id: req.params.userId },
                { $push: { friends: req.params.friendId } },
                { new: true }
            );
            if (!user ||!friend) {
                return res.status(404).json({ message: 'No user or friend found with that ID.' });
            } else if (!user.friends.includes(friend._id)) {
                return res.status(404).json({ message: 'Friend not found in user\'s friend list.' });
            } else {
                res.status(400).json({ message: 'Friend already in user\'s friend list.' });
            }
            res.json({ message: 'Friend added!' });;
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // remove a friend from a user's friend list
    async removeFriend(req, res) {
        try {
            const friend = await User.findById(req.params.friendId);
            const user = await User.findByIdAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );
            if (!user ||!friend) {
                return res.status(404).json({ message: 'No user or friend found with that ID.' });
            } else if (!user.friends.includes(friend._id)) {
                return res.status(404).json({ message: 'Friend not found in user\'s friend list.' });
            } else {
                res.status(400).json({ message: 'Friend already deleted from user\'s friend list.' });
            }
            res.json({ message: 'Friend removed!' });;
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async addThought(req, res) {
        try {
            const userId = req.params.userId;
            
            const newThought = new Thought({
                thoughtText: req.body.thoughtText,
                userId: userId
            });

            await newThought.save();

            res.json({ message: 'Thought added!' });
        } catch (err) {
            console.log(err);
            res.status(500).send("Error adding thought");
        }
    }
};
