const router = require('express').Router();
const {
  getThoughts,
  getoneThought,
  createThought,
  updateThought,
  deleteCourse,
} = require('../../controllers/thoughtController.js');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtID
router.route('/:thoughtID').get(getoneThought).put(updateThought).delete(deleteCourse);

module.exports = router;

