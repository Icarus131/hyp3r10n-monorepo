const express = require("express");
const router = express.Router();

const { testFastReq, sum } = require("../utils//getModel/HelperFast");

router.get('/testFastReq', testFastReq);
router.get('/sum', sum);

module.exports = router;