const express = require("express");
const {addVideoController , getVideoController} = require("../Controllers/videoController")
const router = express.Router();

router.post('/addVideo',addVideoController);
router.post('/getVideo',getVideoController);

module.exports = router;