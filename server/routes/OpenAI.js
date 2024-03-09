const express = require("express");
const router = express.Router();

const { test } = require("../utils/OpenAI/HelperOpenAI");

router.get('/test', test);

module.exports = router;