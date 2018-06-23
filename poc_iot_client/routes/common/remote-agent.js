const agent = require('superagent').agent();

function getRequestToServer(req, res, url) {
    setRequestHeaderAndBodyAndSend(req, res, url, agent.get);
}

function deleteRequestToServer(req, res, url) {
    setRequestHeaderAndBodyAndSend(req, res, url, agent.del);
}

function postRequestToServer(req, res, url) {
    setRequestHeaderAndBodyAndSend(req, res, url, agent.post)
}

function putRequestToServer(req, res, url) {
    setRequestHeaderAndBodyAndSend(req, res, url, agent.put);
}

function setRequestHeaderAndBodyAndSend(req, res, url, rest) {
    return rest.call(agent, url)
        .set('Content-Type',
        req.rawHeaders.indexOf('Content-Type') > -1 ? req.rawHeaders[req.rawHeaders.indexOf('Content-Type') + 1] : '')
        .send(req.body)
        .then((result) => {
//            printLog(url, result);
            res.send(result);
        });
}

function printLog(url, result) {
    try {
        console.log(`${url} -> ${JSON.stringify(result)}`);
    }
    catch (err) {
        console.log(`${url} -> ${err}`);
    }
}

module.exports = {
    getRequestToServer,
    deleteRequestToServer,
    postRequestToServer,
    putRequestToServer
};