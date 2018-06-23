const express = require('express');
const router = express.Router();
const RESTCONSTANTS = require('./common/constants');
const remoteAgent = require('./common/remote-agent');

router.get('/', function (req, res, next) {
    remoteAgent.getRequestToServer(req, res, `${RESTCONSTANTS.SERVER_URL}${req.baseUrl}/`);
});

module.exports = router;
