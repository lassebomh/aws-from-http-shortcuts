const https = require('https')
const fs = require('fs') 
const crypto = require('crypto')

var script = fs.readFileSync('./http-shortcut-code.js', {encoding:'utf8'});

// Polyfills
function getVariable(name) {
    return process.env[name]
}

function setVariable(name, value) {
    process.env[name] = value
}

function showToast(obj) {
    console.log(obj)
}

function hash(algorithm, text) {
    return crypto.createHash(algorithm).update(text).digest('hex');
}

function hmac(algorithm, key, text) {
    return crypto.createHmac(algorithm, key).update(text).digest()
}

function toHexString(uint8array) {
    return uint8array.toString('hex');
}

eval(script);

const url = new URL(process.env['AWS_REQUEST_URL'])

const options = {
  hostname: url.hostname,
  path: url.pathname + url.search,
  method: 'GET',
  headers: {
      'x-amz-date': process.env['AWS_REQUEST_AMZDATE'],
      'Authorization': process.env['AWS_REQUEST_AUTHORIZATION']
  },
}

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', d => {
    process.stdout.write(d)
  })
})

req.on('error', error => {
  console.error(error)
})

req.end()