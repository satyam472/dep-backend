const express = require("express");
const { getVideoByToken, getPurchasedCourses } = require("../Controllers/accessController")
const router = express.Router();

router.post('/getVideo', getVideoByToken);
router.post('/getPurchasedCourses', getPurchasedCourses);

module.exports = router;