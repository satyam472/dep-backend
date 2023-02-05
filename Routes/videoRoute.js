const express = require("express");
const {addVideoController , getVideoController, purchaseVideo} = require("../Controllers/videoController")
const router = express.Router();

router.post('/addVideo', addVideoController);
router.post('/getVideo', getVideoController);
router.post('/purchaseVideo', purchaseVideo);

module.exports = router;