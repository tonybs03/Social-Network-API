const router = require('express').Router();
const {
  getThoughts,
  getoneThought,
  createThought,
  updateThought,
  createReaction,
  deleteReaction,
  deleteThought
} = require('../../controllers/thoughtController.js');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtID
router.route('/:thoughtID').get(getoneThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtID/reactions
router.route('/:thoughtID/reactions').post(createReaction);

router.route('/:thoughtID/reactions/:reactionID').delete(deleteReaction);


module.exports = router;

