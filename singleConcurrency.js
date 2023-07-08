const axios = require('axios');
const { spawn } = require('child_process');

const command = './subconverter/subconverter';

const setResp = (resp, response) => {
  resp.setStatusCode(response.status);
  for (let key in response.headers) {
    resp.setHeader(key, response.headers[key]);
  }
  resp.send(response.data);
}

exports.handler = (req, resp, context) => {
  const childProcess = spawn(command);

  childProcess.stdout.on('data', (data) => {
    console.log(`${data}`);
  });

  childProcess.stderr.on('data', (data) => {
    console.error(`${data}`);
    if (data.includes("Startup completed.")) {
      axios.get('http://127.0.0.1:25500' + req.url)
      .then(function (response) {
        console.log(response.data);
        childProcess.kill('SIGKILL');
        setResp(resp, response);
      })
      .catch(function (error) {
        console.log(error);
        childProcess.kill('SIGKILL');
        setResp(resp, error.response);
      });
    }
  });
}
