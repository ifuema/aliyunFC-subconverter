const axios = require('axios');
const { spawn } = require('child_process');

const command = './subconverter/subconverter';

exports.initializer = function(context, callback) {
  const childProcess = spawn(command);

  childProcess.stdout.on('data', (data) => {
    console.log(`${data}`);
  });

  childProcess.stderr.on('data', (data) => {
    console.error(`${data}`);
    if (data.includes("Startup completed.")) {
      callback(null, "");
    }
  })
}

const setResp = (resp, response) => {
  resp.setStatusCode(response.status);
  for (let key in response.headers) {
    resp.setHeader(key, response.headers[key]);
  }
  resp.send(response.data);
}

exports.handler = (req, resp, context) => {
  axios.get('http://127.0.0.1:25500' + req.url)
    .then(function (response) {
      context.logger.log(response.data);
      setResp(resp, response);
    })
    .catch(function (error) {
      context.logger.log(error);
      setResp(resp, error.response);
    });
}
