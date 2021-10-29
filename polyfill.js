
import { createHmac, createHash } from 'crypto'

export function getVariable(name) {
    return process.env[name]
}

export function setVariable(name, value) {
    return
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