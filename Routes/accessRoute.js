const express = require("express");
const { checkOwnership, getUserRole } = require("../Controllers/accessController")
const router = express.Router();

router.post('/checkOwnership', checkOwnership);
router.post('/getUserRole', getUserRole);

module.exports = router;