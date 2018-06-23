const express = require('express');
const router = express.Router();
const RESTCONSTANTS = require('./common/constants');
const remoteAgent = require('./common/remote-agent');

router.post('/', function (req, res, next) {
    remoteAgent.postRequestToServer(req, res, `${RESTCONSTANTS.SERVER_URL}${req.baseUrl}/`);
});

router.delete('/', function (req, res, next) {
    remoteAgent.deleteRequestToServer(req, res, `${RESTCONSTANTS.SERVER_URL}${req.baseUrl}/`);
});

module.exports = router;
