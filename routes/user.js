const express = require('express');
const router = express.Router();

/* GET current user. */
router.get('/', function(req, res, next) {
    res.json('respond with a resource');
});

module.exports = router;
