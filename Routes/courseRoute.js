const express = require("express");
const { getAllCourseController, getCourseByNameController, addCourseController} = require("../Controllers/courseController")
const router = express.Router();

router.post('/getAllCourse', getAllCourseController);
router.post('/getCourseByName', getCourseByNameController);
router.post('/getPurchasedCourses', getPurchasedCourses);
router.post('/getAuthoredCourses', getAuthoredCourses);
router.post('/addCourse', addCourseController);

module.exports = router;