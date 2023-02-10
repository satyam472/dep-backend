const express = require("express");
const { getAllCourseController, getCourseByNameController, getPurchasedCourses, getAuthoredCourses, addCourseController, addModule, purchaseCourse} = require("../Controllers/courseController")
const router = express.Router();
const multer = require("multer");

// set up multer
const storage = multer.memoryStorage();
// const uploadMiddleware = multer({ storage }).array('course_image', 'tutor_icon');
const uploadMiddleware = multer({ storage }).any();



router.post('/getAllCourse', getAllCourseController);
router.post('/getCourseByName', getCourseByNameController);
router.post('/getPurchasedCourses', getPurchasedCourses);
router.post('/getAuthoredCourses', getAuthoredCourses);
router.post('/addCourse', uploadMiddleware, addCourseController);
router.post('/addModule', addModule);
router.post('/purchaseCourse', purchaseCourse);

module.exports = router;