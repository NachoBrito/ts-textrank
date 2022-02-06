"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Sentence {
    constructor(raw, words) {
        this.words = words;
        this.raw = raw;
    }
    getNormalized() {
        const normalizedWords = this.words.map(w => w.normalized);
        return normalizedWords.join(" ");
    }
}
exports.default = Sentence;
