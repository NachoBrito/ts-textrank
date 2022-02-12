"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Sentence {
    constructor(raw, words, position) {
        this.relevance = 0;
        this.words = words;
        this.raw = raw;
        this.position = position;
    }
    getNormalized() {
        const normalizedWords = this.words.map(w => w.normalized);
        return normalizedWords.join(" ");
    }
}
exports.default = Sentence;
