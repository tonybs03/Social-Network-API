const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');
const thoughtController = require('./thoughtController');

module.exports = {
  // create User
  createUser(req, res) {
    User.create(req.body)
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },

  // Get all Users
  getUsers(req, res) {
    User.find()
      .select('-__v')
      .populate({ path: 'thoughts', select: '-__v' })
      .populate({ path: 'friends', select: '-__v' })
      .then(users => res.json(users))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      })
  },

  // Get a single user by ID
  getoneUser(req, res) {
    User.findOne({ _id: req.params.userID })
      .populate({ path: 'thoughts', select: '-__v' })
      .populate({ path: 'friends', select: '-__v' })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Update a user by ID
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userID },
      { $set: req.body },
      { runValidators: true, new: true }
    )
    .then((user) =>
      !user
        ? res.status(404).json({ message: 'No user with this ID!' })
        : res.json(user)
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },

  // Delete a user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userID })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: 'User and associated thoughts deleted!' }))
      .catch((err) => res.status(500).json(err));
  },

  // Add a friend
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userID },
      { $push: { friends: req.params.friendID } },
      { new: true }
    )
    .then((user) =>
      !user
        ? res.status(404).json({ message: 'No user with this ID!' })
        : res.json(user)
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },

  // Delete a friend
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userID },
      { $pull: { friends: req.params.friendID } },
      { new: true }
    )
    .then((user) =>
      !user
        ? res.status(404).json({ message: 'No user with this ID!' })
        : res.json(user)
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },



};
