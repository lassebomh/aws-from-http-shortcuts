// Do not include this in the HTTP Shortcut
import { showToast, getVariable, hash, hmac, toHexString } from './polyfill.js'
import fetch from 'node-fetch';

const method = 'GET'
const service = 'ec2'
const host = 'ec2.amazonaws.com'
const region = 'us-east-1'
const endpoint = 'https://ec2.amazonaws.com'
const request_parameters = 'Action=DescribeRegions&Version=2013-10-15'

function sign(key, msg) {
    return hmac('sha256', key, msg)
}

function getSignatureKey(key, dateStamp, regionName, serviceName) {
    const kDate = sign('AWS4' + key, dateStamp)
    const kRegion = sign(kDate, regionName)
    const kService = sign(kRegion, serviceName)
    const kSigning = sign(kService, 'aws4_request')
    return kSigning
}

const access_key = getVariable('AWS_ACCESS_KEY_ID')
const secret_key = getVariable('AWS_SECRET_ACCESS_KEY')

const now = new Date()
const amzdate = now.toISOString()
                   .match(/(\d{4})-(\d{2})-(\d{2}T\d{2}):(\d{2}):(\d{2}).\d{3}(Z)/)
                   .splice(1)
                   .join('')

const datestamp = now.toISOString()
                     .match(/(\d{4})-(\d{2})-(\d{2})/)
                     .splice(1)
                     .join('')

const canonical_uri = '/' 
const canonical_querystring = request_parameters
const canonical_headers = 'host:' + host + '\n' + 'x-amz-date:' + amzdate + '\n'
const signed_headers = 'host;x-amz-date'

const payload_hash = hash('sha256', '')

const canonical_request = method + '\n' + canonical_uri + '\n' + canonical_querystring + '\n' + canonical_headers + '\n' + signed_headers + '\n' + payload_hash

const algorithm = 'AWS4-HMAC-SHA256'
const credential_scope = datestamp + '/' + region + '/' + service + '/' + 'aws4_request'
const string_to_sign = algorithm + '\n' +  amzdate + '\n' +  credential_scope + '\n' +  hash('sha256', canonical_request)

const signing_key = getSignatureKey(secret_key, datestamp, region, service)

const signature = toHexString(hmac('sha256', signing_key, string_to_sign))

const authorization_header = algorithm + ' ' + 'Credential=' + access_key + '/' + credential_scope + ', ' +  'SignedHeaders=' + signed_headers + ', ' + 'Signature=' + signature

const headers = {'x-amz-date':amzdate, 'Authorization':authorization_header}

const request_url = endpoint + '?' + canonical_querystring

const response = fetch(request_url, {
    method: method,
    // body: '',
    headers: headers,
}).then((data) => data.text().then((text) => console.log(text)))