const { Reaction, Thought, User } = require('../models');

module.exports = {
    // get all thoughts
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find({})
            .select('-__v');

            if (!thoughts) {
                return res.status(404).json({message: 'No thoughts found.'})
            }
            
            res.json(thoughts);

        } catch (err) {
            console.log(err);
            res.status(500).send({message: 'Something went wrong.'});
        }
    },

    // get a single thought by id
    async getThoughtById (req, res) {
        try {
            const thought = await Thought.findOne({_id: req.params.thoughtId})
            .select ('-__v');

            if (!thought) {
                return res.status(404).json({message: 'No thought found with that ID.'})
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // update a thought by id
    async updateThought (req, res) {
        try {
            const thought = await Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$set: req.body});
            const user = await User.findOneById(req.body.userId);

            if (!user) {
                return res.status(404).json({message: 'No user found with that username.'})
            }
            user.thoughts.push(thought._id);
            await user.save();

            res.json({message: 'Thought updated.'});
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // delete a thought by id
    async deleteThought (req, res) {
        try {
            await Thought.findOneAndDelete({_id: req.params.thoughtId});

            if (!thought) {
                return res.status(404).json({message: 'No thought found with that ID.'})
            }

            res.json({message: 'Thought deleted.'});

        } catch (err) {
            res.status(500).json(err);
        }
    },

    // find all reactions on a single thought by thoughtId
    async getReactionsByThoughtId (req, res) {
        try {
            const thought = await Thought.findOne({_id: req.params.thoughtId})
            .select ('-__v');
            if (!thought) {
                return res.status(404).json({message: 'No thought found with that ID.'})
            }
            res.json(thought.reactions);
        } catch (err) {
            console.log(err);
            res.status(500).send({message: 'Something went wrong.'});
        }
    },

    // create a reaction stored in a single thought's reactions array field
    async createReaction (req, res) {
        try {
            const thought = await Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$push: {reactions: req.body}}, {new: true, runValidators: true});

            if (!thought) {
                return res.status(404).json({message: 'No thought found with that ID.'})
            }

            res.json({message: 'Reaction created.'});
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // delete a reaction by the reaction's reactionId value
    async deleteReaction (req, res) {
        try {
            const thought = await Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$pull: {reactions: {reactionId: req.params.reactionId}}}, {new: true});

            if (!thought) {
                return res.status(404).json({message: 'No thought found with that ID.'})
            }
            res.json({message: 'Reaction deleted.'});
        } catch (err) {
            res.status(500).json(err);
        }
    }
};