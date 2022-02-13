"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NullLogger {
    debug(...args) {
        //do nothing
    }
    log(...args) {
        //do nothing
    }
    info(...args) {
        //do nothing
    }
    warn(...args) {
        //do nothing
    }
    error(...args) {
        //do nothing
    }
}
exports.default = NullLogger;
