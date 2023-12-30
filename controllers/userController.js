const { User } = require('../models');

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

    // create a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // update a user by id
    async updateUser(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
                new: true,
                runValidators: true
            });
            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID.' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // delete a user by id
    async deleteUser(req, res) {
        try {
            const user = await User.findByIdAndDelete(req.params.userId);
            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID.' });
            }
            res.json(user);
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
            res.json(user);
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
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}
