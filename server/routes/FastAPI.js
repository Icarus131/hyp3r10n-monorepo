const express = require("express");
const router = express.Router();

const { testFastReq, sum, predict } = require("../utils//getModel/HelperFast");

router.get('/testFastReq', testFastReq);
router.get('/sum', sum);
router.post('/predict', predict);

module.exports = router;