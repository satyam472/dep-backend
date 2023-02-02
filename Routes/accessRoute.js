const express = require("express");
const { checkVideoAccessController } = require("../Controllers/accessController")
const router = express.Router();

router.post('/checkVideoAccess', checkVideoAccessController);
// router.post('/checkVideoAccess', checkAccessController);

module.exports = router;