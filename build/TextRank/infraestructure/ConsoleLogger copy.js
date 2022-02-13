"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConsoleLogger {
    debug(...args) {
        console.debug(...args);
    }
    log(...args) {
        console.log(...args);
    }
    info(...args) {
        console.info(...args);
    }
    warn(...args) {
        console.warn(...args);
    }
    error(...args) {
        console.error(...args);
    }
}
exports.default = ConsoleLogger;
