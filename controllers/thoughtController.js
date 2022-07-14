const { Thought, User } = require('../models');

module.exports = {
  // Create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userID },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: 'Thought created, but found no user with that ID',
            })
          : res.json('Created the thought🎉')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .select('-__v')
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // Get one thought
  getoneThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtID })
      .select('-__v')
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtID },
      { $set: req.body },
      { runValidators: true, new: true }
    )
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: 'No thought with this id!' })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
  },

  // Create a Reaction
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      {_id: req.params.thoughtID}, 
      {$set: {reactions: req.body}}, 
      {new: true, runValidators: true}
    )
    .select('-__v')
    .populate({path: 'reactions', select: '-__v'})
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: 'No thought with this id!' })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
  },

  // Delete a Reaction 
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtID },
      { $pull: { reactions: { reactionId: req.params.reactionID } } },
      { new: true }
    )
    .then((reaction) =>
      !reaction
        ? res.status(404).json({ message: 'No reaction with this id!' })
        : res.json(reaction)
    )
    .catch((err) => res.status(500).json(err));
  },

  // Delete a thought and pull it fromt the user
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtID })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought found with this ID!' })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtID },
              { $pull: { thoughts: req.params.thoughtID } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({
              message: 'Thought deleted but no user with this ID!',
            })
          : res.json({ message: 'Thought successfully deleted!' })
      )
      .catch((err) => res.status(500).json(err));
  }
};
