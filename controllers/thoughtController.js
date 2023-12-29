const { Reaction, Thought, User } = require('../models');

module.exports = {
    // get all thoughts
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
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

    // create a new thought
    async createThought (req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOne({username: req.body.username});

            if (!user) {
                return res.status(404).json({message: 'No user found with that username.'})
            }

            user.thoughts.push(thought._id);
            await user.save();

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // update a thought by id
    async updateThought (req, res) {
        try {
            const thought = await Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$set: req.body});

            if (!thought) {
                return res.status(404).json({message: 'No thought found with that ID.'})
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // delete a thought by id
    async deleteThought (req, res) {
        try {
            await Thought.findOneAndDelete({_id: req.params.thoughtId});
            res.json({message: 'Thought deleted.'});
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // create a reaction