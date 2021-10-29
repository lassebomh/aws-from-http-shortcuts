
import { createHmac, createHash } from 'crypto'

function toArrayBuffer(buf) {
    var ab = new ArrayBuffer(buf.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buf.length; ++i) {
        view[i] = buf[i];
    }
    return ab;
}

export function getVariable(name) {
    return process.env[name]
}

export function showToast(obj) {
    console.log(obj)
}

export function hash(algorithm, text) {
    return createHash(algorithm).update(text).digest('hex');
}

export function hmac(algorithm, key, text) {
    return createHmac(algorithm, key).update(text).digest()
}

export function toHexString(uint8array) {
    return uint8array.toString('hex');
}