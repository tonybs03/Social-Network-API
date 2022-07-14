const router = require('express').Router();
const {
  getCourses,
  getSingleCourse,
  createThought,
  updateCourse,
  deleteCourse,
} = require('../../controllers/thoughtController.js');

// /api/thoughts
router.route('/').get(getCourses).post(createThought);

// /api/courses/:courseId
router
  .route('/:courseId')
  .get(getSingleCourse)
  .put(updateCourse)
  .delete(deleteCourse);

module.exports = router;
