const express = require("express");
const { getAllCourseController, getCourseByNameController, getPurchasedCourses, getAuthoredCourses, addCourseController, addModule} = require("../Controllers/courseController")
const router = express.Router();
const { uploadToLighhouseQuery } = require("../Queries/courseQuery");

router.post('/getAllCourse', getAllCourseController);
router.post('/getCourseByName', getCourseByNameController);
router.post('/getPurchasedCourses', getPurchasedCourses);
router.post('/getAuthoredCourses', getAuthoredCourses);
router.post('/addCourse', addCourseController);
router.post('/addModule', addModule);
router.post('/testImgaeUploads', uploadToLighhouseQuery);

module.exports = router;