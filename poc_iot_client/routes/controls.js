const express = require('express');
const router = express.Router();
const RESTCONSTANTS = require('./common/constants');
const remoteAgent = require('./common/remote-agent');

router.put('/', function (req, res, next) {
    remoteAgent.putRequestToServer(req, res, `${RESTCONSTANTS.SERVER_URL}${req.baseUrl}/`);
});

module.exports = router;
